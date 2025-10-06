const express = require("express");
const {
  getAllUserAds,
  getAllStoreAds,
  getAd,
  createAd,
  updateAd,
  deleteAd,
} = require("../controllers/ads-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { adminConstant, storeConstant } = require("../config/constants");

const router = express.Router();
router.route("/user").get(getAllUserAds);
router
  .route("/store")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    getAllStoreAds
  );
router
  .route("/create")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    createAd
  );
router
  .route("/:id")
  .get(getAd)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    updateAd
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    deleteAd
  );

module.exports = router;
