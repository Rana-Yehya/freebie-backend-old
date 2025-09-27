const express = require("express");
const {
  getAllProducts,
  // approveStore,
  setProductTag,
  getAllStores,
  approveProduct,
  // freezeStore,
  setStoreStatus,
  getAllUsers,
  sendNotificationToAllUsers,
  sendNotificationToAllStores,
} = require("../controllers/admin-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const { adminConstant } = require("../config/constants");

const router = express.Router();

// router
//   .route("/approve-store")
//   .post(
//     authenticateUserMiddleware,
//     authorizeMiddleware(adminConstant),
//     approveStore
//   );
// router
//   .route("/freeze-store")
//   .post(
//     authenticateUserMiddleware,
//     authorizeMiddleware(adminConstant),
//     freezeStore
//   );

router
  .route("/set-store-status")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    setStoreStatus
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
  .route("/users")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getAllUsers
  );

router
  .route("/send-notification-to-all-users")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    sendNotificationToAllUsers
  );
router
  .route("/send-notification-to-all-stores")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    sendNotificationToAllStores
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
