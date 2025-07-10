const express = require("express");
const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
const {
  uploadImage,
  uploadMultipleImages,
} = require("../helpers/cloudinary/upload-image");
const {
  destroyImage,
  destroyMultipleImages,
} = require("../helpers/cloudinary/destroy-image");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();
//egR_fzaMRZ2V8RgFdDkPFU:APA91bGb9kcPUzh9PBVsQaVlLIvfYXsZYy6ymjrCBOMhtKDPUuBYSeHsbJosBiMb-CpW7B3RYIzk_Z3YYBJfFg2x1l0EyanfHDfLH5qi85K_Lzg6ValL5hY

// const getAllImages = async (req, res) => {
//   const occasion = await prisma.image.findMany({
//     include: {
//       occasion: true,
//       category: true,
//       storeLogo: true,
//       storeBanner: true,
//     },
//   });

//   return res
//     .status(StatusCodes.OK)
//     .json({ isSuccess: true, count: occasion.length, data: occasion });
// };

// router.route("/send-to-device").post(sendToDevice);
// router.route("/upload-images").post(uploadMultipleImages);
// router.route("/destroy-images").post(destroyMultipleImages);
// router.route("/upload-image").post(uploadImage);
// router.route("/destroy-image").post(destroyImage);
// router.route("/images").get(getAllImages);

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
