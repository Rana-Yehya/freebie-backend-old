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
const { adminConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(getAllCountries)
  .post(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    createCountry
  );
router
  .route("/:id")
  .get(getCountry)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    updateCountry
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    deleteCountry
  );

module.exports = router;
