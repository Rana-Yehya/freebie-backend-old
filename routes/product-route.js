const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-management-controller");

const {
  getAllProductsPerState,
  getAllProductsPerOccasions,
  getAllProductsPerCategories,
  getProduct,
  searchAllProducts,
  getAllProductsPerStoreBranch,
} = require("../controllers/product-search-controller");

const {
  authenticateUserMiddleware,
  optionalAuthenticateUserMiddleware,
} = require("../middleware/user-auth-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { storeConstant, adminConstant } = require("../config/constants");
const { route } = require("./country-route");

const router = express.Router();
//
router
  .route("/")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    createProduct
  );
router
  .route("/per-categories")
  .get(optionalAuthenticateUserMiddleware, getAllProductsPerCategories);
router
  .route("/per-occasions")
  .get(optionalAuthenticateUserMiddleware, getAllProductsPerOccasions);
router
  .route("/per-states")
  .get(optionalAuthenticateUserMiddleware, getAllProductsPerState);
router
  .route("/search")
  .get(optionalAuthenticateUserMiddleware, searchAllProducts);
router
  .route("/per-branches")
  .get(optionalAuthenticateUserMiddleware, getAllProductsPerStoreBranch);

router
  .route("/:id")
  .get(getProduct)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    updateProduct
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    deleteProduct
  );

module.exports = router;
