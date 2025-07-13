const express = require("express");
const {
  getAllUserOrders,
  getOrder,
  // updateOrderStatus,
  createOrder,
  getAllStoreOrders,
  cancelOrderByUser,
  changeOrderStatusAsConfirmedByStore,
  changeOrderStatusAsShippedByStore,
  changeOrderStatusAsDeliveredByStore,
  // changeOrderStatusByStore,
  changeOrderStatusAsCancelledByStore,
  // deleteCity,
} = require("../controllers/order-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const {
  userConstant,
  storeConstant,
  adminConstant,
} = require("../config/constants");

const router = express.Router();
//

router.route("/").post(authenticateUserMiddleware, createOrder);
router
  .route("/user")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    getAllUserOrders
  );
router
  .route("/store")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    getAllStoreOrders
  );
router.route("/:id").get(authenticateUserMiddleware, getOrder);

// router
//   .route("/:id")
//   .get(authenticateUserMiddleware, getOrder)
//   .patch(
//     authenticateUserMiddleware,
//     authorizeMiddleware(adminConstant, storeConstant),
//     updateOrderStatus
//   );
router
  .route("/user-cancel-order/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    cancelOrderByUser
  );
router
  .route("/store-confirm-order/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    changeOrderStatusAsConfirmedByStore
  );

router
  .route("/store-ship-order/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    changeOrderStatusAsShippedByStore
  );

// router
//   .route("/store-change-order-status/:id")
//   .patch(
//     authenticateUserMiddleware,
//     authorizeMiddleware(storeConstant),
//     changeOrderStatusByStore
//   );

router
  .route("/store-cancel-order/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    changeOrderStatusAsCancelledByStore
  );

router
  .route("/store-deliver-order/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    changeOrderStatusAsDeliveredByStore
  );

module.exports = router;
