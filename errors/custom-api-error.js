class CustomAPIError extends Error {
  constructor(message, statusCode, isOperational = true, details) {
    super(message);
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
