const express = require("express");
const {
  getAllCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country-controller");
// const { model } = require('mongoose');

const router = express.Router();

router.route("/").get(getAllCountries).post(createCountry);
router.route("/:id").get(getCountry).patch(updateCountry).delete(deleteCountry);

module.exports = router;
//41.35.92.154
//gpjG1YFZNFRWXwtT
//elrana112
//Countrys
/*
mongodb+srv://elrana11s2:<db_password>@cluster0.lunpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
*/
