const express = require("express");
const {
  register,
  login,
  updateProfile,
  showMe,
  deleteAccount,
  // resetPassword,
  // forgotPassword,
  logout,
  sendCode,
  verifyCode,
  changeUserMainLocation,
  deleteUserLocation,
  updateUserLocation,
  createUserLocation,
} = require("../controllers/user-auth-controller");
const {
  authenticateUserMiddleware,
  optionalAuthenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const { userConstant } = require("../config/constants");

const router = express.Router();
// router.route("/send-code").post(adminInvalidRegisterationMiddleware, sendCode);

// router.route("/register").post(adminInvalidRegisterationMiddleware, register);
router.route("/send-code").post(sendCode);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify-code").post(verifyCode);

// router.route("/forgot-password").post(forgotPassword);

// router.route("/reset-password").post(resetPassword);
router
  .route("/info")
  .get(authenticateUserMiddleware, authorizeMiddleware(userConstant), showMe);
router
  .route("/logout")
  .get(authenticateUserMiddleware, authorizeMiddleware(userConstant), logout);
router
  .route("/update")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    updateProfile
  );
router
  .route("/delete")
  .delete(optionalAuthenticateUserMiddleware, deleteAccount);

router
  .route("/location")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    createUserLocation
  );
router
  .route("/location/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    updateUserLocation
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteUserLocation
  );
router
  .route("/change-main-location/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    changeUserMainLocation
  );

module.exports = router;
