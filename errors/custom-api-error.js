const i18n = require("i18n");

class CustomAPIError extends Error {
  constructor(message, statusCode, isOperational = true, details) {
    super(i18n.__(message));
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
}
// const createCustomAPIError = (message, statusCode) => {
//   return new CustomAPIError(message, statusCode);
// };
module.exports = { CustomAPIError };
