const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
// const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
// const path = require("path");
const fs = require("fs");

async function uploadImage({ req, image, folder = "file-upload" }) {
  const uploadedImage = await cloudinary.uploader.upload(
    image.tempFilePath,
    { filename_override: `${Date.now()}`, folder: folder }

    // (error, result) => {
    //   fs.unlinkSync(req.files.image.tempFilePath);
    //   // console.log(error);
    //   if (error) {
    //     throw new BadRequestError("Error uploading to cloudinary");
    //   } else {
    //     // console.log("Image uploaded to Cloudinary: ", result);
    //     //  const imagePath = path.join(
    //     return res.status(StatusCodes.CREATED).json({
    //       isSuccess: true,
    //       image: { src: result.secure_url },
    //     });
    //   }
    //   // console.log(result, error);
    // }
  );
  fs.unlinkSync(image.tempFilePath);
  //TODO will this go to the error handler?
  //TODOit has no next function
  if (!uploadedImage.secure_url) {
    throw new BadRequestError("Error uploading to cloudinary");
  }
  // req.images = uploadedImage;
  const imageToStore = [uploadedImage.secure_url, uploadedImage.public_id];
  req.isSingleImage = true;
  req.singleImageUploadedData = uploadedImage.public_id;
  return imageToStore;
  // return res.status(StatusCodes.CREATED).json({
  //   isSuccess: true,
  //   image: { src: uploadedImage },
  // });
  // return next();
  // await imageToUpload.mv(imagePath);
}
// const uploadImage = async (req, res, next) => {
//   console.log(req.files);
//   if (!req.files) {
//     throw new BadRequestError("No files were uploaded.");
//   }
//   let imageToUpload = req.files.image;

//   if (!imageToUpload.mimetype.startsWith("image")) {
//     throw new BadRequestError("Please add an image.");
//   }
//   const maxSize = 1024 * 1024;
//   //1200x1200
//   if (imageToUpload.size > maxSize) {
//     throw new BadRequestError("Please enter a smaller image.");
//   }
//   const uploadedImage = await cloudinary.uploader.upload(
//     req.files.image.tempFilePath,
//     { filename_override: `${Date.now()}`, folder: "file-upload" }

//     // (error, result) => {
//     //   fs.unlinkSync(req.files.image.tempFilePath);
//     //   // console.log(error);
//     //   if (error) {
//     //     throw new BadRequestError("Error uploading to cloudinary");
//     //   } else {
//     //     // console.log("Image uploaded to Cloudinary: ", result);
//     //     //  const imagePath = path.join(
//     //     return res.status(StatusCodes.CREATED).json({
//     //       isSuccess: true,
//     //       image: { src: result.secure_url },
//     //     });
//     //   }
//     //   // console.log(result, error);
//     // }
//   );
//   fs.unlinkSync(req.files.image.tempFilePath);
//   if (!uploadedImage.secure_url) {
//     throw new BadRequestError("Error uploading to cloudinary");
//   }
//   req.images = uploadedImage;
//   return res.status(StatusCodes.CREATED).json({
//     isSuccess: true,
//     image: { src: uploadedImage },
//   });
//   // return next();
//   // await imageToUpload.mv(imagePath);
// };
async function uploadMultipleImages({ req, images, folder = "file-upload" }) {
  const urls = [];
  const publicIds = [];
  if (images) {
    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      let imageToUpload = images[imageIndex];

      if (!imageToUpload.mimetype.startsWith("image")) {
        throw new BadRequestError("Please add an image.");
      }
      const maxSize = 1024 * 1024;
      //1200x1200
      if (imageToUpload.size > maxSize) {
        throw new BadRequestError("Please enter a smaller image.");
      }
      // req.files.map(async (file) => {
      const uploadedImage = await cloudinary.uploader.upload(
        imageToUpload.tempFilePath,
        { filename_override: `${Date.now()}`, folder: folder }

        // (error, result) => {
        //   fs.unlinkSync(req.files.image.tempFilePath);
        //   // console.log(error);
        //   if (error) {
        //     throw new BadRequestError("Error uploading to cloudinary");
        //   } else {
        //     // console.log("Image uploaded to Cloudinary: ", result);
        //     //  const imagePath = path.join(
        //     return res.status(StatusCodes.CREATED).json({
        //       isSuccess: true,
        //       image: { src: result.secure_url },
        //     });
        //   }
        //   // console.log(result, error);
        // }
      );

      fs.unlinkSync(imageToUpload.tempFilePath);
      if (!uploadedImage.secure_url) {
        throw new BadRequestError("Error uploading to cloudinary");
      }
      urls.push(uploadedImage.secure_url);
      publicIds.push(uploadedImage.public_id);
    }
  }
  const imageToStore = [urls, publicIds];
  req.isMultiImage = true;
  req.multiImageUploadedData = publicIds;
  return imageToStore;
}
// const uploadMultipleImages = async (req, res, next) => {
//   if (!req.files) {
//     // throw new BadRequestError("No files were uploaded.");
//     return next();
//   }
//   if (!req.files.images) {
//     //throw new BadRequestError("No images were uploaded.");
//     return next();
//   }
//   const urls = [];
//   const publicIds = [];
//   if (req.files.images) {
//     for (
//       let imageIndex = 0;
//       imageIndex < req.files.images.length;
//       imageIndex++
//     ) {
//       let imageToUpload = req.files.images[imageIndex];

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
//         { filename_override: `${Date.now()}`, folder: "images-upload" }

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
//   return res.status(StatusCodes.CREATED).json({
//     isSuccess: true,
//     urls: urls,
//     publicIds: publicIds,
//     // image: { src: destroyedImage },
//   });
// };

module.exports = { uploadImage, uploadMultipleImages };
