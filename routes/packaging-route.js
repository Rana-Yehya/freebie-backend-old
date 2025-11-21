const express = require("express");

const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  storeConstant,
  adminConstant,
  userConstant,
} = require("../config/constants");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const {
  getAllPackages,
  createPackaging,
  updatePackaging,
  deletePackaging,
  createPackageVariant,
  deletePackageVariant,
} = require("../controllers/packaging-management-controller");
const {
  searchPackages,
  addPackageToCart,
} = require("../controllers/packaging-search-controller");

const router = express.Router();
router
  .route("/")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getAllPackages
  );
router.route("/search").get(searchPackages);
router
  .route("/")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createPackaging
  );
router
  .route("/cart/:id")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    addPackageToCart
  );
// router
//   .route("/:id")
//   .patch(
//     authenticateUserMiddleware,
//     authorizeMiddleware(adminConstant),
//     updatePackaging
//   );
router
  .route("/variant/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createPackageVariant
  );
router
  .route("/variant/:id")
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deletePackageVariant
  );
router
  .route("/:id")
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    updatePackaging
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deletePackaging
  );

module.exports = router;
