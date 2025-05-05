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
const { adminConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(getAllCountryStates)
  .post(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    createState
  );
router
  .route("/:id")
  .get(getState)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    updateState
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    deleteState
  );

module.exports = router;
