const express = require("express");
const {
  createUpdatePlanLimit,
  getAllPlanLimits,
  deletePlanLimit,
} = require("../controllers/plan-limit-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const { storeConstant, adminConstant } = require("../config/constants");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const router = express.Router();

router
  .route("/create")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createUpdatePlanLimit
  );
router
  .route("/:id")
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deletePlanLimit
  );
router.route("/").get(getAllPlanLimits);
module.exports = router;
