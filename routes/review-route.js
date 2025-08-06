const express = require("express");
const {
  getAllProductReviews,
  createReview,
  deleteReview,
} = require("../controllers/review-controller");
const {
  authenticateUserMiddleware,
  optionalAuthenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { userConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/:id")
  .get(optionalAuthenticateUserMiddleware, getAllProductReviews)
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    createReview
  )
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    createReview
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant),
    deleteReview
  );

module.exports = router;
