const express = require("express");
const {
  getAllProducts,
  approveStore,
  getAllStores,
  approveProduct,
} = require("../controllers/admin-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/user-auth-middleware");
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
  .route("/products")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getAllProducts
  );
module.exports = router;
