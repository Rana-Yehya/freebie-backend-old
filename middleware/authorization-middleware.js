const { UnauthorizatedError } = require("../errors");

const authorizeMiddleware = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user);
    // console.log(roles);
    const { role } = req.user;
    if (!roles.includes(role)) {
      throw new UnauthorizatedError("Unauthorized to perform this action");
    }
    next();
  };
};

module.exports = { authorizeMiddleware };
