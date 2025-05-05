const express = require("express");
const {
  approveStore,
  getAllStores,
} = require("../controllers/admin-controller");
const {
  authenticateMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const { adminConstant } = require("../config/constants");

const router = express.Router();

router
  .route("/approve-store")
  .post(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    approveStore
  );
router
  .route("/stores")
  .get(
    authenticateMiddleware,
    authorizeMiddleware(adminConstant),
    getAllStores
  );
module.exports = router;
