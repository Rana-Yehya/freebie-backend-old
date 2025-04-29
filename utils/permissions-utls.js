const { UnauthorizatedError } = require("../errors");

const chechPermissions = (requestUserId, resourceUserId) => {
  if (requestUserId === resourceUserId) return;
  throw new UnauthorizatedError("Not authorized to access this route");
};
module.exports = {
  chechPermissions,
};
