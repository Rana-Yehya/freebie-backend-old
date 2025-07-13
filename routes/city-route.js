const express = require("express");
const {
  getAllStateCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/city-controller");
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
  .get(getAllStateCities)
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createCity
  );
router
  .route("/:id")
  .get(getCity)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    updateCity
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deleteCity
  );

module.exports = router;
