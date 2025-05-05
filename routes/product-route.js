const express = require("express");
const {
  getAllProductsPerCategories,
  getAllProductsPerOccasions,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-controller");
const {
  authenticateMiddleware,
} = require("../middleware/authentication-middleware");
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
    authenticateMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    createProduct
  );
router.route("/per-categories").get(getAllProductsPerCategories);
router.route("/per-occasions").get(getAllProductsPerOccasions);

router
  .route("/:id")
  .get(getProduct)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    updateProduct
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    deleteProduct
  );

module.exports = router;
