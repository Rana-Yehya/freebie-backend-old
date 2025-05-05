const express = require("express");
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category-controller");
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
  .get(getAllCategories)
  .post(authenticateMiddleware, authorizeMiddleware(admin), createCategory);
router
  .route("/:id")
  .get(getCategory)
  .patch(authenticateMiddleware, authorizeMiddleware(admin), updateCategory)
  .delete(authenticateMiddleware, authorizeMiddleware(admin), deleteCategory);

module.exports = router;
