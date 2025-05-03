const { CustomAPIError } = require("../errors/custom-api-error");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
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
    message: customError.message,
    // ...(err.details && { details: err.details }),
  });
  // return res
  //   .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //   .json({ isSuccess: false, error: err });
};
module.exports = errorHandler;
