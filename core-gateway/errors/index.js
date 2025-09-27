const { CustomAPIError } = require("./custom-api-error");
const { UnauthenticatedError } = require("./unauthenticated-error");
const { BadRequestError } = require("./bad-request-error");
const { NotFoundError } = require("./not-found-error");
const { UnauthorizedError } = require("./unauthorized-error");
const { RateLimitError } = require("./rate-limit-error");
const { ServerError } = require("./server-error");
const { LockedError } = require("./locked-error");
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
  RateLimitError,
  LockedError,
  ServerError,
  UnauthorizedError,
};
