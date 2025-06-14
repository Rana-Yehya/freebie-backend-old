const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-management-controller");

const {
  getAllProductsPerState,
  getAllProductsPerOccasions,
  getAllProductsPerCategories,
  getProduct,
  getAllProductsCanBeDeliveredOutsideStates,
  searchAllProducts,
  getFeaturedProducts,
  getBigSaleProducts,
  getPopularProducts,
  getProductsQuery,
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

router
  .route("/per-categories")
  .get(optionalAuthenticateUserMiddleware, getAllProductsPerCategories);
router
  .route("/query")
  .get(optionalAuthenticateUserMiddleware, getProductsQuery);
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
  .route("/big-sale")
  .get(optionalAuthenticateUserMiddleware, getBigSaleProducts);
router
  .route("/featured")
  .get(optionalAuthenticateUserMiddleware, getFeaturedProducts);
router
  .route("/popular")
  .get(optionalAuthenticateUserMiddleware, getPopularProducts);

router
  .route("/delivery-outside-state")
  .get(
    optionalAuthenticateUserMiddleware,
    getAllProductsCanBeDeliveredOutsideStates
  );
router
  .route("/")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getAllProducts
  );

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
router
  .route("/")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    createProduct
  );
module.exports = router;
