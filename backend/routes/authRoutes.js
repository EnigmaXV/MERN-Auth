const express = require("express");
const router = express.Router();

const {
  signup,
  verifyEmail,
  logout,
  login,
} = require("../controllers/authControllers");

router.route("/signup").post(signup);
router.route("/verify-email").post(verifyEmail);
router.route("/logout").get(logout);
router.route("/login").post(login);
module.exports = router;
