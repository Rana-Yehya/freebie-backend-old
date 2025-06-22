const { getMessaging } = require("firebase-admin/messaging");

async function sendNotificationToOneUserHelper({ title, body, fcmToken }) {
  const notification = {
    title: title,
    body: body,
  };
  //  "c7SGXJf0QMC0biYtBPifMG:APA91bGGhijlH04xrx4sEf9oco8SoJHrDz9ZtLQkGZ5Nw_2DVDFgzD4iZRku4720et8S2t85nlfLZczW_QPKHVADxIttajWEJ_BOHNtTsOKtQF_Qxl7vIjM";
  // const type = "notification";
  const notificationPayload = {
    data: notification,
    token: fcmToken,
  };
  // } else if (type === "data") {
  //   notificationPayload = {
  //     data: data,
  //     token: [fcmToken],
  //   };
  // } else {
  //   notificationPayload = {
  //     notification: notification,
  //     data: data,
  //     token: [fcmToken],
  //   };
  // }

  // var notificationOptions = {
  //   priority: "high",
  // };
  console.log(notificationPayload);
  const result = await getMessaging().send(notificationPayload);

  return result;
  // .then(function (response) {
  //   console.log("Successfully sent notification:", response);
  //   res.json({ Message: "Successfully sent notification" });
  // })
  // .catch(function (error) {
  //   console.log("Error sending notification:", error);
  //   res.json({ Message: "Error sending notification" });
  // });
}

module.exports = { sendNotificationToOneUserHelper };
