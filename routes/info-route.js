const express = require("express");
const {
  aboutApp,
  privacyPolicy,
  refundPolicy,
  termsAndConditions,
  createInfo,
  // deleteCity,
} = require("../controllers/info-controller");

const { userConstant, adminConstant } = require("../config/constants");
const {
  authenticateUserMiddleware,
} = require("../middleware/user-auth-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const router = express.Router();
//
router.route("/about-app").get(aboutApp);
router.route("/privacy-and-policy").get(privacyPolicy);
router.route("/refund-policy").get(refundPolicy);
router.route("/terms-and-conditions").get(termsAndConditions);

router
  .route("/create-info")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createInfo
  );
router
  .route("/update-info")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createInfo
  );

module.exports = router;
