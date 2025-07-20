const express = require("express");
const {
  getAllProducts,
  approveStore,
  setProductTag,
  getAllStores,
  approveProduct,
  sendNotificationToAllUsers,
} = require("../controllers/admin-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const { adminConstant } = require("../config/constants");

const router = express.Router();

router
  .route("/approve-store")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    approveStore
  );
router
  .route("/approve-product")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    approveProduct
  );

router
  .route("/stores")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getAllStores
  );
router
  .route("/send-notification-to-all-users")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    sendNotificationToAllUsers
  );
router
  .route("/products")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getAllProducts
  );
router
  .route("/set-product-tag")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    setProductTag
  );
module.exports = router;
