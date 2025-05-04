const express = require("express");
const {
  getAllCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country-controller");
const {
  authenticateMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { admin } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(getAllCountries)
  .post(authenticateMiddleware, authorizeMiddleware(admin), createCountry);
router
  .route("/:id")
  .get(getCountry)
  .patch(authenticateMiddleware, authorizeMiddleware(admin), updateCountry)
  .delete(authenticateMiddleware, authorizeMiddleware(admin), deleteCountry);

module.exports = router;
