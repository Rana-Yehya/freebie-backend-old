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
const { adminConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(getAllOccasions)
  .post(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    createOccasion
  );
router
  .route("/:id")
  .get(getOccasion)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    updateOccasion
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    deleteOccasion
  );

module.exports = router;
