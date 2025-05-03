const express = require("express");
const {
  approveStore,
  getAllStores,
} = require("../controllers/admin-controller");
const {
  authenticateMiddleware,
  authorizeMiddleware,
} = require("../middleware/auth-middleware");
const { admin } = require("../config/constants");

const router = express.Router();

router
  .route("/approve-store")
  .post(authenticateMiddleware, authorizeMiddleware(admin), approveStore);
router
  .route("/stores")
  .get(authenticateMiddleware, authorizeMiddleware(admin), getAllStores);
module.exports = router;
