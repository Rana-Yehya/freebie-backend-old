const express = require("express");
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category-controller");
const {
  authenticateUserMiddleware,
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
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    createCategory
  );
router
  .route("/:id")
  .get(getCategory)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    updateCategory
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deleteCategory
  );

module.exports = router;
