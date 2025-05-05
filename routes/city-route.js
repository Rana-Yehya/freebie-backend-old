const express = require("express");
const {
  getAllStateCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/city-controller");
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
  .get(getAllStateCities)
  .post(authenticateMiddleware, authorizeMiddleware(admin), createCity);
router
  .route("/:id")
  .get(getCity)
  .patch(authenticateMiddleware, authorizeMiddleware(admin), updateCity)
  .delete(authenticateMiddleware, authorizeMiddleware(admin), deleteCity);

module.exports = router;
