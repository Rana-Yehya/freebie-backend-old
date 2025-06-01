const express = require("express");
const {
  getAllCountryStates,
  getState,
  createState,
  updateState,
  deleteState,
} = require("../controllers/state-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/user-auth-middleware");
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
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createState
  );
router
  .route("/:id")
  .get(getState)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    updateState
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deleteState
  );

module.exports = router;
