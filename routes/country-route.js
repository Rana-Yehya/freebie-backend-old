const express = require("express");
const {
  getAllCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country-controller");
const {
  authenticateUserMiddleware,
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
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createCountry
  );
router
  .route("/:id")
  .get(getCountry)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    updateCountry
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deleteCountry
  );

module.exports = router;
