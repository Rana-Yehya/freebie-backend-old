const express = require("express");
const fs = require("fs");

const {
  getAllTransactions,
  createWithdrawTransaction,
  // deleteCity,
} = require("../controllers/transaction-controller");
const {
  authenticateUserMiddleware,
} = require("../middleware/authentication-middleware");
const imagekit = require("../config/image-kit");

const router = express.Router();

// const sendSMS = async (req, res) => {
//   const message = await client.messages.create({
//     body: "Hello from my friendly name!",
//     from: "Freebie", // Alphanumeric sender ID or Twilio number
//     to: "+201275559131", // Recipient's phone number
//   });
//   console.log(message);
//   return res.status(200).json({ message: "SMS sent successfully" });
// };
const addImage = async (req, res, next) => {
  const files = req.files.file;
  // console.log(files);
  const file = fs.createReadStream(files.tempFilePath);
  console.log(file);

  const result = await imagekit.imagekit.upload({
    file: file, // File content to upload
    fileName: files.name, // Desired file name
  });
  console.log(result);
  return res.status(200).json({
    isSuccess: true,
    // userCart: userCart,
    result: result,
  });
};

const addMultiImage = async (req, res, next) => {
  const files = req.files.file;
  let publicIds = [];
  let secureUrls = [];
  for (let i = 0; i < files.length; i = i + 1) {
    const element = files[i];

    const file = fs.createReadStream(element.tempFilePath);
    console.log(element);

    const result = await imagekit.imagekit.upload({
      file: file, // File content to upload
      fileName: element.name, // Desired file name
    });
    console.log(result);
    if (result.fileId) {
      publicIds.push(result.fileId);
    }
    if (result.url) {
      secureUrls.push(result.url);
    }
  }

  return res.status(200).json({
    isSuccess: true,
    // userCart: userCart,
    publicIds,
    secureUrls,
  });
};

const deleteImage = async (req, res, next) => {
  const { files } = req.body;

  const result = await imagekit.imagekit.deleteFile(files);

  return res.status(200).json({
    isSuccess: true,
    // userCart: userCart,
    result: result,
  });
};

const deleteMultiImage = async (req, res, next) => {
  const { files } = req.body;

  const result = await imagekit.imagekit.bulkDeleteFiles(files);

  return res.status(200).json({
    isSuccess: true,
    // userCart: userCart,
    result: result,
  });
};
router.route("/").get(authenticateUserMiddleware, getAllTransactions);
router.route("/").post(authenticateUserMiddleware, createWithdrawTransaction);
router.route("/add-image").post(addImage);
router.route("/add-multi-image").post(addMultiImage);
// router.route("/send-sms").post(sendSMS);
router.route("/delete-image").post(deleteImage);
router.route("/delete-multi-image").post(deleteMultiImage);

module.exports = router;
