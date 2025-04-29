const { UnauthorizatedError, UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt-utils");
const User = require("../models/user-model");
const { sendTokenToCookies } = require("../utils/jwt-utils");

const UserToken = require("../models/user-token-model");
const authenticateMiddleware = async (req, res, next) => {
  // const { authorization } = req.headers;
  // if (!authorization || !authorization.startsWith("Bearer ")) {
  //   throw new UnauthenticatedError("Unauthorizated");
  // }

  try {
    const { accessToken, refreshToken } = req.signedCookies;

    if (accessToken) {
      const decoded = isTokenValid(accessToken);
      const user = await User.findById({ _id: decoded.userId }).select(
        "-password"
      );
      const { userId, email } = decoded;
      req.user = { userId: userId, email, name: user.name, role: user.role };
      return next();
    } else {
      const decoded = isTokenValid(refreshToken);
      const { userId, email } = decoded;
      req.user = { userId: userId, email, name: user.name, role: user.role };
      const existingToken = await UserToken.findOne({
        user: userId,
        refreshToken,
      });
      if (!existingToken || !existingToken?.isValid) {
        throw new UnauthenticatedError("Invalid Credentials");
      }
      sendTokenToCookies({ res, user: req.user, refreshToken });
      return next();
    }
  } catch (e) {
    console.log(e);
    throw new UnauthenticatedError("Invalid Credentials");
  }
};
const authorizeMiddleware = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      throw new UnauthorizatedError("Unauthorized to perform this action");
    }
    next();
  };
};
module.exports = { authenticateMiddleware, authorizeMiddleware };
