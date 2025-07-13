const express = require("express");
const {
  getAllProductReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { adminConstant, userConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/:id")
  .get(getAllProductReviews)
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    createReview
  )
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    updateReview
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteReview
  );

module.exports = router;
