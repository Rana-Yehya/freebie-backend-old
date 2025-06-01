const express = require("express");
const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");

const router = express.Router();

const sendToDevice = async (req, res) => {
  const notification = {
    title: "A Push Notification Test",
    body: "Test Body",
  };
  const data = {
    key1: "value1",
    key2: "value2",
  };
  const fcmToken =
    "c7SGXJf0QMC0biYtBPifMG:APA91bGGhijlH04xrx4sEf9oco8SoJHrDz9ZtLQkGZ5Nw_2DVDFgzD4iZRku4720et8S2t85nlfLZczW_QPKHVADxIttajWEJ_BOHNtTsOKtQF_Qxl7vIjM";
  const type = "notification";
  let notificationPayload;

  notificationPayload = {
    data: data,
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

  var notificationOptions = {
    priority: "high",
  };
  console.log(notificationPayload);
  getMessaging()
    .send(notificationPayload)
    .then(function (response) {
      console.log("Successfully sent notification:", response);
      res.json({ Message: "Successfully sent notification" });
    })
    .catch(function (error) {
      console.log("Error sending notification:", error);
      res.json({ Message: "Error sending notification" });
    });
};

router.route("/send-to-device").post(sendToDevice);

module.exports = router;

/*

app.post('/subscribeToTopic', function(req, res){
    const topic = req.body.topic;
    const token = req.body.token;

    admin.messaging().subscribeToTopic(token, topic)
    .then(function(response){
        console.log("Successfully subscribed to topic:", response);
        res.json({"Message": "Successfully subscribed to topic."});
    })
    .catch(function(error){
        console.log("Error subscribing to topic:", error);
        res.json({"Message": "Error subscribing to topic."});
    })
});
app.post('/sendToTopic', function(req, res){
    const topic = req.body.topic;
    const type = req.body.type;
    let notificationPayload;

    if(type === 'notification'){
        notificationPayload = {
            "notification": notification
        };
    } else if(type === 'data'){
        notificationPayload = {
            "data": data
        };
    } else{
        notificationPayload = {
            "notification": notification,
            "data": data
        };   
    }

    var notificationOptions = {
        priority: "high"
    };

    admin.messaging().sendToTopic(topic, notificationPayload, notificationOptions)
    .then(function(response){
        console.log("Successfully sent notification to a topic:", response);
        res.json({"Message": "Successfully sent notification to a topic."});
    })
    .catch(function(error){
        console.log("Error in sending notification to a topic:", error);
        res.json({"Message": "Error in sending notification to a topic."});
    })
});

app.post('/unsubscribeFromTopic', function(req, res){
    const topic = req.body.topic;
    const token = req.body.token;

    admin.messaging().unsubscribeFromTopic(token, topic)
    .then(function(response){
        console.log("Successfully subscribed to topic:", response);
        res.json({"Message": "Successfully subscribed to topic."});
    })
    .catch(function(error){
        console.log("Error subscribing to topic:", error);
        res.json({"Message": "Error subscribing to topic."});
    })
});
*/
