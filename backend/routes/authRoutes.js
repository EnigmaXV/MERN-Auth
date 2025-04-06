const express = require("express");
const router = express.Router();

const {
  signup,
  verifyEmail,
  logout,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers");

router.route("/signup").post(signup);
router.route("/verify-email").post(verifyEmail);
router.route("/logout").get(logout);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
module.exports = router;
