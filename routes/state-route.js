const express = require("express");
const {
  getAllCountryStates,
  getState,
  createState,
  updateState,
  deleteState,
} = require("../controllers/state-controller");
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
  .get(getAllCountryStates)
  .post(authenticateMiddleware, authorizeMiddleware(admin), createState);
router
  .route("/:id")
  .get(getState)
  .patch(authenticateMiddleware, authorizeMiddleware(admin), updateState)
  .delete(authenticateMiddleware, authorizeMiddleware(admin), deleteState);

module.exports = router;
