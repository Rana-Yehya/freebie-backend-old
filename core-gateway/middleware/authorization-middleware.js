const { UnauthorizedError } = require("../errors");

const authorizeMiddleware = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user);
    // console.log(roles);
    const role = req.role;
    if (!roles.includes(role)) {
      throw new UnauthorizedError(
        i18n.__("Unauthorized to perform this action")
      );
    }
    next();
  };
};

module.exports = { authorizeMiddleware };
