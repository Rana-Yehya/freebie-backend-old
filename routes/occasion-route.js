const express = require("express");
const {
  getAllOccasions,
  getOccasion,
  createOccasion,
  updateOccasion,
  deleteOccasion,
} = require("../controllers/occasion-controller");
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
  .get(getAllOccasions)
  .post(authenticateMiddleware, authorizeMiddleware(admin), createOccasion);
router
  .route("/:id")
  .get(getOccasion)
  .patch(authenticateMiddleware, authorizeMiddleware(admin), updateOccasion)
  .delete(authenticateMiddleware, authorizeMiddleware(admin), deleteOccasion);

module.exports = router;
