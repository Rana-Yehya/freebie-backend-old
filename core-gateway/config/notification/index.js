const admin = require("firebase-admin");

var serviceAccount = require("./freebie-7851f-firebase-adminsdk-fbsvc-81ebfd9e0e.json");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { firebaseAdmin };
