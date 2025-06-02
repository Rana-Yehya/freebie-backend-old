const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");
// const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
// const path = require("path");
const fs = require("fs");

const destroyImage = async (req, res, next) => {
  console.log(req.body.images);
  if (!req.body.images) {
    //throw new BadRequestError("No images to delete were sent.");
    return next();
  }

  const destroyedImage = await cloudinary.uploader.destroy(
    req.body.images
    // { filename_override: `${Date.now()}`, folder: "file-upload" }

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
  console.log(destroyedImage);
  // if (!destroyedImage.secure_url) {
  //   throw new BadRequestError("Error uploading to cloudinary");
  // }
  req.images = destroyedImage;
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    image: { src: destroyedImage },
  });
  // return next();
  // await imageToUpload.mv(imagePath);
};

const destroyMultipleImages = async (req, res, next) => {
  console.log(req.body.images);
  if (!req.body.images) {
    //throw new BadRequestError("No images to delete were sent.");
    return next();
  }
  if (req.body.images) {
    // console.log(req.body.images.length);
    // const imagesList = JSON.parse(req.body.images);
    // console.log("imagesList");

    // console.log(imagesList);
    // console.log(imagesList.length);

    for (
      let imageIndex = 0;
      imageIndex < req.body.images.length;
      imageIndex++
    ) {
      let imageToDestroy = req.body.images[imageIndex];
      console.log("imageToDestroy");

      console.log(imageToDestroy);

      const destroyedImage = await cloudinary.uploader.destroy(
        imageToDestroy
        // { filename_override: `${Date.now()}`, folder: "file-upload" }

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
      console.log(destroyedImage);
    }
  }
  // if (!destroyedImage.secure_url) {
  //   throw new BadRequestError("Error uploading to cloudinary");
  // }
  //   req.images = destroyedImage;
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    // image: { src: destroyedImage },
  });
  // return next();
  // await imageToUpload.mv(imagePath);
};
module.exports = { destroyImage, destroyMultipleImages };
