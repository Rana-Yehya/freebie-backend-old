const { UnauthorizatedError, UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt-utils");
const { prisma } = require("../config/prisma");
const { storeConstant } = require("../config/constants");

// const { sendTokenToCookies } = require("../utils/jwt-utils");

// const UserToken = require("../models/user-token-model");
const authenticateStoreMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthorizated");
  }
  const accessToken = authorization.split(" ")[1];
  // const { accessToken, refreshToken } = req.signedCookies;

  if (accessToken) {
    console.log(accessToken);

    const decoded = isTokenValid({
      token: accessToken,
      secret: process.env.ACCESS_JWT_SECRET,
    });
    console.log(decoded);

    if (decoded) {
      const user = await prisma.store.findUnique({
        where: { id: decoded.userId },
      });
      console.log(user);

      if (user.accessTokenSecret !== decoded.accessTokenSecret) {
        throw new UnauthenticatedError("Unauthorizated");
      }
      // const { userId, email } = decoded;
      req.user = user;
      return next();
    } else {
      throw new UnauthenticatedError("Unauthorizated");
    }
  } else {
    throw new UnauthenticatedError("Unauthorizated");
  }
};
const optionAuthenticateStoreMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.startsWith("Bearer ") == false) {
    return next();
    //   throw new UnauthenticatedError("Unauthorizated");
  }
  const accessToken = authorization.split(" ")[1];
  // const { accessToken, refreshToken } = req.signedCookies;

  if (accessToken) {
    const decoded = isTokenValid({
      token: accessToken,
      secret: process.env.ACCESS_JWT_SECRET,
    });
    if (decoded) {
      const user =
        decoded.role === storeConstant
          ? await prisma.store.findUnique({
              where: { id: decoded.userId },
            })
          : await prisma.user.findUnique({
              where: { id: decoded.userId },
            });
      if (user.accessTokenSecret !== decoded.accessTokenSecret) {
        throw new UnauthenticatedError("Unauthorizated");
      }
      // const { userId, email } = decoded;

      req.user = user;
      decoded.role === storeConstant ? req.user.role === storeConstant : null;

      return next();
    } else {
      return next();
    }
  } else {
    return next();
  }
};
module.exports = {
  authenticateStoreMiddleware,
  optionAuthenticateStoreMiddleware,
};
