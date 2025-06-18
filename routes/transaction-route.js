const express = require("express");
const {
  getAllTransactions,
  // deleteCity,
} = require("../controllers/transaction-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/user-auth-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { userConstant } = require("../config/constants");

const router = express.Router();
//
router.route("/").get(authenticateUserMiddleware, getAllTransactions);

module.exports = router;
