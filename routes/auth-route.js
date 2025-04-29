const express = require("express");
const {
  register,
  login,
  updateProfile,
  verifyEmail,
  showMe,
  resetPassword,
  forgotPassword,
  logout,
} = require("../controllers/auth-controller");
const { authenticateMiddleware } = require("../middleware/auth-middleware");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify-email").post(verifyEmail);
router.route("/logout").get(authenticateMiddleware, logout);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password").post(resetPassword);
router.route("/showMe").get(authenticateMiddleware, showMe);

router.route("/updateUser").patch(authenticateMiddleware, updateProfile);
module.exports = router;
