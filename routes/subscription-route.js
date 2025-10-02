const express = require("express");
const {
  createSubscription,
} = require("../controllers/subscription-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const { storeConstant, adminConstant } = require("../config/constants");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const router = express.Router();

router
  .route("/create")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    createSubscription
  );
module.exports = router;
