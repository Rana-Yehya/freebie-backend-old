const express = require("express");
const {
  getAllStoreDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/discount-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { adminConstant, storeConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    getAllStoreDiscounts
  )
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    createDiscount
  );
router
  .route("/:id")
  //   .get(getCategory)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    updateDiscount
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    deleteDiscount
  );

module.exports = router;
