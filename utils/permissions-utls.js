const { UnauthorizedError } = require("../errors");
const i18n = require("i18n");

const chechPermissions = (requestUserId, resourceUserId) => {
  if (requestUserId === resourceUserId) return;
  throw new UnauthorizedError(i18n.__("Not authorized to access this route"));
};
module.exports = {
  chechPermissions,
};
