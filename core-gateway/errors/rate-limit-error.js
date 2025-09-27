const { CustomAPIError } = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class RateLimitError extends CustomAPIError {
  constructor(message = "Too many requests", isOperational = true, details) {
    super(message, StatusCodes.TOO_MANY_REQUESTS, isOperational, details);
  }
}
module.exports = { RateLimitError };
