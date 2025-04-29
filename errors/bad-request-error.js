const { CustomAPIError } = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomAPIError {
  constructor(message = "Invalid request", isOperational = true, details) {
    // super(message);
    super(message, StatusCodes.BAD_REQUEST, isOperational, details);
  }
}

module.exports = { BadRequestError };
