const express = require("express");
const {
  getAllProducts,
  // approveStore,
  setProductTag,
  getAllStores,
  setProductStatus,
  // freezeStore,
  setStoreStatus,
  getAllUsers,
  sendNotificationToAllUsers,
  sendNotificationToAllStores,
  getAllBundles,
} = require("../controllers/admin-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const {
  authorizeMiddleware,
} = require("../middleware/authorization-middleware");

const {
  adminConstant,
  adminPrivilegeAllConstant,
} = require("../config/constants");
const {
  authorizeAdminMiddleware,
} = require("../middleware/authorization-admin-middleware");
const { prisma } = require("../config/prisma");

const router = express.Router();

// router
//   .route("/approve-store")
//   .post(
//     authenticateUserMiddleware,
//     authorizeMiddleware(adminConstant),
//     approveStore
//   );
// router
//   .route("/freeze-store")
//   .post(
//     authenticateUserMiddleware,
//     authorizeMiddleware(adminConstant),
//     freezeStore
//   );

router.route("/set-store-status").post(
  authenticateUserMiddleware,
  authorizeMiddleware(adminConstant),
  authorizeAdminMiddleware(adminPrivilegeAllConstant),

  setStoreStatus
);

router
  .route("/set-product-status")
  .post(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    authorizeAdminMiddleware(adminPrivilegeAllConstant),
    setProductStatus
  );
// router
//   .route("/create-admin")
//   .post(
//     authenticateUserMiddleware,
//     authorizeMiddleware(adminConstant),
//     authorizeAdminMiddleware(adminPrivilegeAllConstant),
//     approveProduct
//   );
router.route("/stores").get(
  authenticateUserMiddleware,
  authorizeMiddleware(adminConstant),
  authorizeAdminMiddleware(adminPrivilegeAllConstant),

  getAllStores
);

router.route("/users").get(
  authenticateUserMiddleware,
  authorizeMiddleware(adminConstant),
  authorizeAdminMiddleware(adminPrivilegeAllConstant),

  getAllUsers
);

router.route("/send-notification-to-all-users").post(
  authenticateUserMiddleware,
  authorizeMiddleware(adminConstant),
  authorizeAdminMiddleware(adminPrivilegeAllConstant),

  sendNotificationToAllUsers
);
router.route("/send-notification-to-all-stores").post(
  authenticateUserMiddleware,
  authorizeMiddleware(adminConstant),
  authorizeAdminMiddleware(adminPrivilegeAllConstant),

  sendNotificationToAllStores
);

router
  .route("/products")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    authorizeAdminMiddleware(adminPrivilegeAllConstant),
    getAllProducts
  );
router.route("/userLocations").get(async (req, res) => {
  const userLocations = await prisma.userLocations.findMany({});
  res.json({
    userLocations,
  });
});

router
  .route("/bundles")
  .get(
    authenticateUserMiddleware,
    authorizeMiddleware(adminConstant),
    authorizeAdminMiddleware(adminPrivilegeAllConstant),
    getAllBundles
  );

router.route("/set-product-tag").post(
  authenticateUserMiddleware,
  authorizeMiddleware(adminConstant),
  authorizeAdminMiddleware(adminPrivilegeAllConstant),

  setProductTag
);
module.exports = router;
