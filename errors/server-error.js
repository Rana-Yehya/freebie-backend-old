const { CustomAPIError } = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class ServerError extends CustomAPIError {
  constructor(
    message = "Server/Database error",
    isOperational = true,
    details
  ) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, isOperational, details);
  }
}
module.exports = { ServerError };
