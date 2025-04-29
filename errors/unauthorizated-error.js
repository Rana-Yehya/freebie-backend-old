const { CustomAPIError } = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class UnauthorizatedError extends CustomAPIError {
  constructor(
    message = "Forbidden to access this resource",
    isOperational = true,
    details
  ) {
    super(message, StatusCodes.FORBIDDEN, isOperational, details);
  }
}

module.exports = { UnauthorizatedError };
