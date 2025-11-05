const express = require("express");
const {
  getAllCartItems,
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
const {
  createUpdateCartProductItem,
  deleteCartProductItem,
} = require("../controllers/cart-product-controller");
const {
  deleteCartBundleItem,
  createUpdateCartBundleItem,
} = require("../controllers/cart-bundle-controller");

const router = express.Router();
//

router
  .route("/product")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    createUpdateCartProductItem
  );

router
  .route("/product/:id") //:id
  // .patch(
  //   authenticateUserMiddleware,
  //   authorizeMiddleware(userConstant),
  //   createUpdateCartItem
  //   // updateCartQuantity
  // )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteCartProductItem
  );

router
  .route("/bundle")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    createUpdateCartBundleItem
  );

router
  .route("/bundle/:id") //:id
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteCartBundleItem
  );
router
  .route("/")
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteCart
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

router
  .route("/")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    getAllCartItems
  );
module.exports = router;
