const express = require("express");
const {
  getAllStoreProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
} = require("../controllers/product-management-controller");

const {
  // getAllProductsPerState,
  // getAllProductsPerOccasions,
  // getAllProductsPerCategories,
  getProduct,
  // getAllProductsCanBeDeliveredOutsideStates,
  searchAllProducts,
  // getFeaturedProducts,
  // getBigSaleProducts,
  // getPopularProducts,
  getProductsQuery,
  getAllProductsPerStoreBranch,
} = require("../controllers/product-search-controller");

const {
  authenticateUserMiddleware,
  optionalAuthenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { storeConstant, adminConstant } = require("../config/constants");

const router = express.Router();

// router
//   .route("/per-categories")
//   .get(optionalAuthenticateUserMiddleware, getAllProductsPerCategories);
router
  .route("/query")
  .get(optionalAuthenticateUserMiddleware, getProductsQuery);
// router
//   .route("/per-occasions")
//   .get(optionalAuthenticateUserMiddleware, getAllProductsPerOccasions);
// router
//   .route("/per-states")
//   .get(optionalAuthenticateUserMiddleware, getAllProductsPerState);
router
  .route("/search")
  .get(optionalAuthenticateUserMiddleware, searchAllProducts);
router
  .route("/per-store/:id")
  .get(optionalAuthenticateUserMiddleware, getAllProductsPerStoreBranch);
// router
//   .route("/big-sale")
//   .get(optionalAuthenticateUserMiddleware, getBigSaleProducts);
// router
//   .route("/featured")
//   .get(optionalAuthenticateUserMiddleware, getFeaturedProducts);
// router
//   .route("/popular")
//   .get(optionalAuthenticateUserMiddleware, getPopularProducts);

// router
//   .route("/delivery-outside-state")
//   .get(
//     optionalAuthenticateUserMiddleware,
//     getAllProductsCanBeDeliveredOutsideStates
//   );
router
  .route("/store")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    getAllStoreProducts
  );

router
  .route("/:id")
  .get(optionalAuthenticateUserMiddleware, getProduct)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    updateProduct
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    deleteProduct
  );
router
  .route("/")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    createProduct
  );

router
  .route("/images/:id")
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    deleteProductImage
  );
module.exports = router;
