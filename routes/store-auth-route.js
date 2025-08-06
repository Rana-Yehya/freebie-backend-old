const express = require("express");
const {
  login,
  register,
  logout,
  updateProfile,
  showMe,
  sendCode,
  changePassword,
  verifyCode,
  forgotPassword,
  deleteStore,
} = require("../controllers/store-auth-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const { storeConstant, adminConstant } = require("../config/constants");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/forgot-password").post(forgotPassword);
router.route("/send-code").post(sendCode);
router.route("/verify-code").post(verifyCode);

router
  .route("/change-password")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    changePassword
  );

router
  .route("/delete")
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    deleteStore
  );

router.route("/info").get(authenticateUserMiddleware, showMe);
router.route("/logout").get(authenticateUserMiddleware, logout);

router
  .route("/update")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    updateProfile
  );
module.exports = router;
