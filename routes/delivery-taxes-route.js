const express = require("express");
const {
  getAllDeliveryTaxes,
  getSingleDeliveryTaxes,
  createDeliveryTaxes,
  updateDeliveryTaxes,
  deleteDeliveryTaxes,
} = require("../controllers/delivery-taxes-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/user-auth-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { adminConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getAllDeliveryTaxes
  )
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createDeliveryTaxes
  );
router
  .route("/:id")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getSingleDeliveryTaxes
  )
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    updateDeliveryTaxes
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deleteDeliveryTaxes
  );

module.exports = router;
