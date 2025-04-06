const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, user) => {
  const payload = {
    userId: user._id,
    userEmail: user.email,
    userName: user.name,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

module.exports = generateTokenAndSetCookie;
