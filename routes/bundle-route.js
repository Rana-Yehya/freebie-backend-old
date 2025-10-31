const express = require("express");
const {
  getAllStoreBundles,
  createBundle,
  deleteBundle,
  updateBundle,
} = require("../controllers/bundle-management-controller");
const {
  searchAllBundles,
  getBundle,
} = require("../controllers/bundle-search-controller");

const {
  authenticateUserMiddleware,
  optionalAuthenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { storeConstant, adminConstant } = require("../config/constants");

const router = express.Router();

router
  .route("/search")
  .get(optionalAuthenticateUserMiddleware, searchAllBundles);

router
  .route("/store")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    getAllStoreBundles
  );

router
  .route("/:id")
  .get(optionalAuthenticateUserMiddleware, getBundle)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    updateBundle
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    deleteBundle
  );
router
  .route("/")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    createBundle
  );

module.exports = router;
