const express = require("express");
const {
  getAllStoreBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
} = require("../controllers/branch-controller");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const {
  authenticateStoreMiddleware,
  optionAuthenticateStoreMiddleware,
} = require("../middleware/store-auth-middleware");

const { admin, store } = require("../config/constants");

const router = express.Router();

router
  .route("/")
  .get(
    optionAuthenticateStoreMiddleware,
    // authenticateStoreMiddleware,
    // authorizeMiddleware(admin, store),
    getAllStoreBranches
  )
  .post(
    authenticateStoreMiddleware,
    authorizeMiddleware(admin, store),
    createBranch
  );
router
  .route("/:id")
  .get(getBranch)
  .patch(
    authenticateStoreMiddleware,
    authorizeMiddleware(admin, store),
    updateBranch
  )
  .delete(
    authenticateStoreMiddleware,
    authorizeMiddleware(admin, store),
    deleteBranch
  );

module.exports = router;
