const { CustomAPIError } = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class LockedError extends CustomAPIError {
  constructor(
    message = "This resource is locked",
    isOperational = true,
    details
  ) {
    // super(message);
    super(message, StatusCodes.LOCKED, isOperational, details);
  }
}

module.exports = { LockedError };
