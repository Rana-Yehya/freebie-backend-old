const express = require("express");
const {
  getAllCountryAds,
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
const { adminConstant } = require("../config/constants");

const router = express.Router();
//
router.route("/").get(getAllCountryAds).post(
  // authenticateUserMiddleware,
  // authorizeMiddleware(adminConstant),
  createAd
);
router
  .route("/:id")
  .get(getAd)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    updateAd
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deleteAd
  );

module.exports = router;
