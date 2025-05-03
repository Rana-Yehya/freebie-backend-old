const express = require("express");
const {
  getAllCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country-controller");

const router = express.Router();

router.route("/").get(getAllCountries).post(createCountry);
router.route("/:id").get(getCountry).patch(updateCountry).delete(deleteCountry);

module.exports = router;
