const express = require("express");
const {
  getAllCartItems,
  deleteCartItem,
  createCartItem,
  updateCartQuantity,
  // deleteCity,
} = require("../controllers/cart-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/user-auth-middleware");
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
    createCartItem
  );
router
  .route("/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    updateCartQuantity
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteCartItem
  );

module.exports = router;
