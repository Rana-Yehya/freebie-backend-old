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
  // authenticateStoreMiddleware,
  optionalAuthenticateUserMiddleware,
} = require("../middleware/authentication-middleware");

const { storeConstant, adminConstant } = require("../config/constants");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const { prisma } = require("../config/prisma");

const router = express.Router();
router.route("/branchLocation").get(async (req, res) => {
  const branchLocation = await prisma.branchLocation.findMany();
  return res.json({ branchLocation });
});
router
  .route("/")
  .get(
    optionalAuthenticateUserMiddleware,
    // authenticateStoreMiddleware,
    // authorizeMiddleware(admin, store),
    getAllStoreBranches
  )
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    createBranch
  );
router
  .route("/:id")
  .get(getBranch)
  .patch(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant, storeConstant),
    updateBranch
  )
  .delete(
    authenticateUserMiddleware,
    authorizeMiddleware(storeConstant),
    deleteBranch
  );

module.exports = router;
