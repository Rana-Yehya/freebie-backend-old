const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const notFound = (req, res) =>
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ isSuccess: false, message: i18n.__("Route Not Found") });

module.exports = notFound;
