const { CustomAPIError } = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomAPIError {
  constructor(message = "Unauthenticated", isOperational = true, details) {
    super(message, StatusCodes.UNAUTHORIZED, isOperational, details);
  }
}

module.exports = { UnauthenticatedError };
