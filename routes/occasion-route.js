const express = require("express");
const {
  getAllOccasions,
  getOccasion,
  createOccasion,
  updateOccasion,
  deleteOccasion,
} = require("../controllers/occasion-controller");
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
  .get(getAllOccasions)
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createOccasion
  );
router
  .route("/:id")
  .get(getOccasion)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    updateOccasion
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deleteOccasion
  );

// router
//   .route("/delete-occasion-image/:id")
//   .delete(
//     authenticateUserMiddleware,
//     authorizeMiddleware(adminConstant),
//     deleteOccasionImage
//   );

module.exports = router;
