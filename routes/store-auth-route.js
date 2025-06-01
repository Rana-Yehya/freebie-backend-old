const express = require("express");
const {
  register,
  login,
  updateProfile,
  showMe,
  resetPassword,
  forgotPassword,
  logout,
  deleteStore,
} = require("../controllers/store-auth-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/user-auth-middleware");
const {
  adminInvalidRegisterationMiddleware,
} = require("../middleware/admin-invalid-registeration-middleware");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/delete-store").delete(authenticateUserMiddleware, deleteStore);

// router.route("/forgot-password").post(forgotPassword);

// router.route("/reset-password").post(resetPassword);
// router.route("/user-info").get(authenticateUserMiddleware, showMe);
// router.route("/logout").get(authenticateUserMiddleware, logout);

// router.route("/update-user").patch(authenticateUserMiddleware, updateProfile);
module.exports = router;
