const { CustomAPIError } = require("../errors/custom-api-error");
const { StatusCodes } = require("http-status-codes");
const {
  destroyImage,
  destroyMultipleImages,
} = require("../helpers/image-kit/delete-image");
const i18n = require("i18n");

const errorHandler = async (err, req, res, next) => {
  console.log(err);
  // let customError = {
  //   statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  //   message: err.message || "Internal Server Error",
  // };
  // if (err instanceof CustomAPIError) {
  //   return res
  //     .status(err.statusCode)
  //     .json({ isSuccess: false, error: err.message });
  // }
  // if (err.code && err.code == 11000) {
  //   customError.message = `Duplicate Key Error for ${Object.keys(
  //     err.keyValue
  //   )}`;
  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  // }
  // if (err.name && err.name === "ValidationError") {
  //   customError.message = err.message;
  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  // }
  // if (err.name && err.name === "CastError") {
  //   customError.message = `No Item with value ${err.value}`;
  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  // }
  // return res
  //   .status(customError.statusCode)
  //   .json({ isSuccess: false, error: customError.message });
  // // return res
  // //   .status(StatusCodes.INTERNAL_SERVER_ERROR)
  // //   .json({ isSuccess: false, error: err });

  // console.log(err);
  // let customError = {
  //   statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  //   message: err.message || 'Internal Server Error',
  // };

  if (
    req.isSingleImage &&
    req.isSingleImage == true &&
    req.singleImageUploadedData != undefined
  ) {
    await destroyMultipleImages({
      imagesPublicIds: req.singleImageUploadedData,
    });
  } else if (
    req.isMultiImage &&
    req.isMultiImage == true &&
    req.multiImageUploadedData != undefined
  ) {
    await destroyMultipleImages({
      imagesPublicIds: req.multiImageUploadedData,
    });
  }
  let customError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Internal Server Error",
  };
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      isSuccess: false,
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }
  // if (err.code && err.code == 11000) {
  //   customError.message = `Duplicate Key Error for ${Object.keys(
  //     err.keyValue
  //   )}`;
  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  // }
  // console.log(err.meta);
  if (err.meta && err.meta.cause) {
    customError.message = err.meta.cause;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name && err.name === "ValidationError") {
    customError.message = err.message;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // if (err.name && err.name === 'CastError') {
  //   customError.message = `No Item with value ${err.value}`;
  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  // }
  return res.status(customError.statusCode).json({
    isSuccess: false,
    // message: customError.message,
    message: i18n.__(customError.message),
    // ...(err.details && { details: err.details }),
  });
  // return res
  //   .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //   .json({ isSuccess: false, error: err });
};
module.exports = errorHandler;
