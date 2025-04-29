const { CustomAPIError } = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends CustomAPIError {
  constructor(message = "Resource not found", isOperational = true, details) {
    super(message, StatusCodes.NOT_FOUND, isOperational, details);
  }
}

module.exports = { NotFoundError };
// import { StatusCodes } from "http-status-codes";
// import { CustomAPIError } from "./custom-api-error";

// export class NotFoundError extends CustomAPIError {
//   constructor(
//     message: string = "Resource not found",
//     isOperational = true,
//     details?: any
//   ) {
//     super(message, StatusCodes.NOT_FOUND, isOperational, details);
//   }
// }
