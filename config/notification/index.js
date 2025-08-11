const admin = require("firebase-admin");

var serviceAccount = require("./freebie-7851f-firebase-adminsdk-fbsvc-81ebfd9e0e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
