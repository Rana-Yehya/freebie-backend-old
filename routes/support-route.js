const express = require("express");
const {
  getInboxes,
  getSingleInbox,
  sendInbox,
  deleteInbox, // deleteCity,
} = require("../controllers/support-controller");

const {
  userConstant,
  adminConstant,
  storeConstant,
} = require("../config/constants");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const router = express.Router();
//
router
  .route("/")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getInboxes
  );

router
  .route("/")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(userConstant, storeConstant),
    sendInbox
  );
// router
//   .route("/report-a-problem")
//   .post(
//     authenticateUserMiddleware,
//     authorizeMiddleware(userConstant, storeConstant),
//     reportAProblem
//   );
router
  .route("/:id")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    getSingleInbox
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    deleteInbox
  );

module.exports = router;
