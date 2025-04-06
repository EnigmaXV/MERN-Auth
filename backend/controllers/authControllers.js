const User = require("../models/authModel");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
} = require("../Email/sendEmails");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("Please provide all fields");
    }
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User already exists try to login",
      });
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const user = await User.create({
      email,
      password,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day
    });

    generateTokenAndSetCookie(res, user);
    await sendVerificationEmail(user.email, verificationToken, user.name);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    if (!code) {
      throw new Error("Please provide verification code");
    }
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    sendWelcomeEmail(user.email, user.name);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Please provide all fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    generateTokenAndSetCookie(res, user);
    user.lastLogin = new Date();
    await user.save();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("auth_token");
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Logged out successfully",
  });
};

const forgotPassword = async (req, res) => {
  let { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found",
      });
    }
    let resetPassword = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetPassword;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 1000; // 1 minute
    await user.save();

    let resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetPassword}`;

    await sendForgotPasswordEmail(resetUrl, user.email);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Reset password link sent to your email",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  verifyEmail,
  logout,
  login,
  forgotPassword,
  resetPassword,
};
