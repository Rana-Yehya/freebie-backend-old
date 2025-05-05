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
const { adminConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(getAllStateCities)
  .post(authenticateMiddleware, authorizeMiddleware(adminConstant), createCity);
router
  .route("/:id")
  .get(getCity)
  .patch(authenticateMiddleware, authorizeMiddleware(adminConstant), updateCity)
  .delete(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    deleteCity
  );

module.exports = router;
