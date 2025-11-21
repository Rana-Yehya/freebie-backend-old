const express = require("express");
const {
  getAllUserOrders,
  getOrder,
  // updateOrderStatus,
  createOrder,
  createPaidOrder,
  deleteUnpaidOrder,
  getAllStoreOrders,
  cancelProductOrderByUser,
  changeOrderStatusByStore,
  changeOrderStatusAsRefundedByAdmin,
  // changeOrderStatusAsShippedByStore,
  changeOrderStatusAsDeliveredByAdmin,
  // changeOrderStatusByStore,
  // changeOrderStatusAsCancelledByStore,
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
// payment gateway
router
  .route("/create-paid-order")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    createPaidOrder
  );
router
  .route("/delete-unpaid-order/:id")
  .delete(authenticateUserMiddleware, deleteUnpaidOrder);

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
  .route("/user-cancel-order")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    cancelProductOrderByUser
  );
router
  .route("/store-change-order-status")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    changeOrderStatusByStore
  );

// router
//   .route("/store-ship-order/:id")
//   .patch(
//     authenticateUserMiddleware,
//     authorizeMiddleware(storeConstant),
//     changeOrderStatusAsShippedByStore
//   );

// router
//   .route("/store-change-order-status/:id")
//   .patch(
//     authenticateUserMiddleware,
//     authorizeMiddleware(storeConstant),
//     changeOrderStatusByStore
//   );

// router
//   .route("/store-cancel-order/:id")
//   .patch(
//     authenticateUserMiddleware,
//     authorizeMiddleware(storeConstant),
//     changeOrderStatusAsCancelledByStore
//   );

router
  .route("/deliver-order")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    changeOrderStatusAsDeliveredByAdmin
  );
router
  .route("/refund-order")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    changeOrderStatusAsRefundedByAdmin
  );

module.exports = router;
