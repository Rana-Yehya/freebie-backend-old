const express = require("express");
const {
  getAllCartItems,
  deleteCartItem,
  createCart,
  updateCartQuantity,
  // deleteCity,
} = require("../controllers/cart-controller");
const {
  authenticateMiddleware,
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
    authenticateMiddleware,
    authorizeMiddleware(userConstant),
    getAllCartItems
  )
  .post(authenticateMiddleware, authorizeMiddleware(userConstant), createCart);
router
  .route("/:id")
  .patch(
    authenticateMiddleware,
    authorizeMiddleware(userConstant),
    updateCartQuantity
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware(userConstant),
    deleteCartItem
  );

module.exports = router;
