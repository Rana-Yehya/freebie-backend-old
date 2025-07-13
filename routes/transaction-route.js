const express = require("express");
const {
  getAllTransactions,
  createWithdrawTransaction,
  // deleteCity,
} = require("../controllers/transaction-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");
const { userConstant } = require("../config/constants");

const router = express.Router();
//
router.route("/").get(authenticateUserMiddleware, getAllTransactions);
router.route("/").post(authenticateUserMiddleware, createWithdrawTransaction);

module.exports = router;
