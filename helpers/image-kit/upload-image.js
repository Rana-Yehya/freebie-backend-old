const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../../errors");
// const fileUpload = require("express-fileupload");
// const cloudinary = require("cloudinary").v2;
const imagekit = require("../../config/image-kit");

// const path = require("path");
const fs = require("fs");

// async function uploadImage({ req, image, folder = "file-upload" }) {
//   const uploadedImage = await cloudinary.uploader.upload(image.tempFilePath, {
//     filename_override: `${Date.now()}`,
//     folder: folder,
//   });
//   fs.unlinkSync(image.tempFilePath);
//   if (!uploadedImage.secure_url) {
//     throw new BadRequestError("Error uploading to cloudinary");
//   }
//   // req.images = uploadedImage;
//   const imageToStore = [uploadedImage.secure_url, uploadedImage.public_id];
//   req.isSingleImage = true;
//   req.singleImageUploadedData = uploadedImage.public_id;
//   return imageToStore;
// }
async function uploadImage({ req, image }) {
  const file = fs.createReadStream(image.tempFilePath);

  if (!image.mimetype.startsWith("image")) {
    throw new BadRequestError("Please add an image");
  }
  const maxSize = 1024 * 1024;
  //1200x1200
  if (image.size > maxSize) {
    throw new BadRequestError("Please enter a smaller image");
  }

  const result = await imagekit.imagekit.upload({
    file: file,
    fileName: image.name,
  });
  console.log(result);
  fs.unlinkSync(image.tempFilePath);
  if (!result.fileId) {
    throw new BadRequestError("Error uploading image");
  }
  // req.images = uploadedImage;
  const imageToStore = [result.url, result.fileId];
  req.isSingleImage = true;
  if (req.singleImageUploadedData) {
    req.singleImageUploadedData = [
      ...req.singleImageUploadedData,
      result.fileId,
    ];
  } else {
    req.singleImageUploadedData = [result.fileId];
  }
  return imageToStore;
}

// async function uploadMultipleImages({ req, images, folder = "file-upload" }) {
//   const urls = [];
//   const publicIds = [];
//   if (images) {
//     for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
//       let imageToUpload = images[imageIndex];

//       if (!imageToUpload.mimetype.startsWith("image")) {
//         throw new BadRequestError("Please add an image.");
//       }
//       const maxSize = 1024 * 1024;
//       //1200x1200
//       if (imageToUpload.size > maxSize) {
//         throw new BadRequestError("Please enter a smaller image.");
//       }
//       // req.files.map(async (file) => {
//       const uploadedImage = await cloudinary.uploader.upload(
//         imageToUpload.tempFilePath,
//         { filename_override: `${Date.now()}`, folder: folder }

//         // (error, result) => {
//         //   fs.unlinkSync(req.files.image.tempFilePath);
//         //   // console.log(error);
//         //   if (error) {
//         //     throw new BadRequestError("Error uploading to cloudinary");
//         //   } else {
//         //     // console.log("Image uploaded to Cloudinary: ", result);
//         //     //  const imagePath = path.join(
//         //     return res.status(StatusCodes.CREATED).json({
//         //       isSuccess: true,
//         //       image: { src: result.secure_url },
//         //     });
//         //   }
//         //   // console.log(result, error);
//         // }
//       );

//       fs.unlinkSync(imageToUpload.tempFilePath);
//       if (!uploadedImage.secure_url) {
//         throw new BadRequestError("Error uploading to cloudinary");
//       }
//       urls.push(uploadedImage.secure_url);
//       publicIds.push(uploadedImage.public_id);
//     }
//   }
//   const imageToStore = [urls, publicIds];
//   req.isMultiImage = true;
//   req.multiImageUploadedData = publicIds;
//   return imageToStore;
// }

async function uploadMultipleImages({ req, images, folder = "file-upload" }) {
  const urls = [];
  const publicIds = [];
  req.isMultiImage = true;

  if (images) {
    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      let imageToUpload = images[imageIndex];

      if (!imageToUpload.mimetype.startsWith("image")) {
        throw new BadRequestError("Please add an image");
      }
      const maxSize = 1024 * 1024;
      //1200x1200
      if (imageToUpload.size > maxSize) {
        throw new BadRequestError("Please enter a smaller image");
      }

      const file = fs.createReadStream(element.tempFilePath);

      const result = await imagekit.imagekit.upload({
        file: file,
        fileName: imageToUpload.name,
      });
      console.log(result);
      fs.unlinkSync(imageToUpload.tempFilePath);

      if (!result.fileId) {
        throw new BadRequestError("Error uploading image");
      }
      if (result.fileId) {
        publicIds.push(result.fileId);
      }
      if (result.url) {
        urls.push(result.url);
      }
    }
  }
  const imageToStore = [urls, publicIds];
  req.multiImageUploadedData = publicIds;
  return imageToStore;
}
async function imagekitUploadFile({ req, res, files }) {
  const result = await imagekit.imagekit.upload({
    file: files, // File content to upload
    fileName: "my_file_name.jpg", // Desired file name
  });
  console.log(result);
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    // userCart: userCart,
    result: result,
  });
}
module.exports = { uploadImage, uploadMultipleImages, imagekitUploadFile };
