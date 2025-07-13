const { UnauthorizedError } = require("../errors");

const chechPermissions = (requestUserId, resourceUserId) => {
  if (requestUserId === resourceUserId) return;
  throw new UnauthorizedError("Not authorized to access this route");
};
module.exports = {
  chechPermissions,
};
