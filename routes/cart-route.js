const express = require("express");
const {
  getAllCartItems,
  deleteCartItem,
  createUpdateCartItem,
  // updateCartQuantity,
  deleteCart,
  calculateSubTotal,
  calculateDeliveryFees,
  // deleteCity,
} = require("../controllers/cart-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { userConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    getAllCartItems
  )
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    createUpdateCartItem
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteCart
  );
router
  .route("/") //:id
  // .patch(
  //   authenticateUserMiddleware,
  //   authorizeMiddleware(userConstant),
  //   createUpdateCartItem
  //   // updateCartQuantity
  // )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteCartItem
  );
router
  .route("/:id") //:id
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteCartItem
  );
router
  .route("/calculate-subtotal")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    calculateSubTotal
  );
router
  .route("/calculate-delivery")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    calculateDeliveryFees
  );
module.exports = router;
