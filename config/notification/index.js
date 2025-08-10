const admin = require("firebase-admin");

var serviceAccount = require("./freebie-dc79a-firebase-adminsdk-fbsvc-e7820b92b2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
