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
const { adminConstant } = require("../config/constants");

const router = express.Router();
//
router
  .route("/")
  .get(getAllCategories)
  .post(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    createCategory
  );
router
  .route("/:id")
  .get(getCategory)
  .patch(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    updateCategory
  )
  .delete(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    deleteCategory
  );

module.exports = router;
