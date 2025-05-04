const express = require("express");
const {
  register,
  login,
  // updateProfile,
  showMe,
  // resetPassword,
  // forgotPassword,
  logout,
} = require("../controllers/admin-auth-controller");
const {
  authenticateMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const {
  adminInvalidRegisterationMiddleware,
} = require("../middleware/admin-invalid-registeration-middleware");

const router = express.Router();

router.route("/register").post(adminInvalidRegisterationMiddleware, register);
router.route("/login").post(login);

// router.route("/forgot-password").post(forgotPassword);

// router.route("/reset-password").post(resetPassword);
router.route("/user-info").get(authenticateMiddleware, showMe);
router.route("/logout").get(authenticateMiddleware, logout);
// router.route("/updateUser").patch(authenticateMiddleware, updateProfile);
module.exports = router;
