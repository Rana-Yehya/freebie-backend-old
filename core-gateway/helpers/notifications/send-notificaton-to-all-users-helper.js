const { getMessaging } = require("firebase-admin/messaging");

async function sendNotificationToAllUsersHelper({ title, body, fcmTokens }) {
  const notification = {
    title: title,
    body: body,
  };
  //  "c7SGXJf0QMC0biYtBPifMG:APA91bGGhijlH04xrx4sEf9oco8SoJHrDz9ZtLQkGZ5Nw_2DVDFgzD4iZRku4720et8S2t85nlfLZczW_QPKHVADxIttajWEJ_BOHNtTsOKtQF_Qxl7vIjM";
  // const type = "notification";
  for (let i = 0; i < fcmTokens.length; i = i + 500) {
    const fcmToken = fcmTokens.slice(
      i,
      fcmTokens.length < i + 500 ? fcmTokens.length : i + 500
    );
    // } else if (type === "data") {
    //   notificationPayload = {
    //     data: data,
    //     token: [fcmToken],
    //   };
    // } else {
    //   notificationPayload = {
    //     notification: notification,
    //     token: [fcmToken],
    //   };
    // }
    // const notificationPayload = {
    //   data: notification,
    //   token: fcmTokens,
    // };
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
    const result = await getMessaging().sendEachForMulticast({
      notification: notification,
      tokens: fcmToken,
    });
    console.log(result);
  }
  // return result;
  // .then(function (response) {
  //   console.log("Successfully sent notification:", response);
  //   res.json({ Message: "Successfully sent notification" });
  // })
  // .catch(function (error) {
  //   console.log("Error sending notification:", error);
  //   res.json({ Message: "Error sending notification" });
  // });
}

module.exports = { sendNotificationToAllUsersHelper };
