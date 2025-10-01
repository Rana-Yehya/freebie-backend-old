const { UnauthorizedError } = require("../errors");

const authorizeAdminMiddleware = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user);
    // console.log(roles);
    const role = req.user.adminPrivilege;

    if (!roles.includes(role)) {
      throw new UnauthorizedError(
        i18n.__("Unauthorized to perform this action")
      );
    }
    next();
  };
};

module.exports = { authorizeAdminMiddleware };
