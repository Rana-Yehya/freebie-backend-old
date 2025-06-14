const { UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt-utils");
const { prisma } = require("../config/prisma");
const {
  storeConstant,
  userConstant,
  adminConstant,
} = require("../config/constants");

const authenticateUserMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthorizated");
  }
  const accessToken = authorization.split(" ")[1];
  // const { accessToken, refreshToken } = req.signedCookies;

  if (accessToken) {
    const decoded = isTokenValid({
      token: accessToken,
      secret: process.env.ACCESS_JWT_SECRET,
    });
    // console.log("decoded", decoded);

    if (decoded) {
      const user =
        decoded.role === storeConstant
          ? await prisma.store.findUnique({
              where: { id: decoded.userId },
            })
          : await prisma.user.findUnique({
              where: { id: decoded.userId },
            });
      // console.log("user.accessTokenSecret", user.accessTokenSecret);
      // console.log("user", user);
      // console.log("decoded", decoded);
      // console.log("decoded.accessTokenSecret", decoded.accessTokenSecret);
      // console.log(
      //   "user.accessTokenSecret",
      //   user.accessTokenSecret.toString() !=
      //     decoded.accessTokenSecret.toString()
      // );
      // faf71e28742a0167a26f;
      // faf71e28742a0167a26f;
      if (
        !user ||
        !user.accessTokenSecret ||
        !decoded.accessTokenSecret ||
        user.accessTokenSecret.toString() !=
          decoded.accessTokenSecret.toString()
      ) {
        throw new UnauthenticatedError("Unauthorizated");
      }
      // const { userId, email } = decoded;

      req.user = user;
      decoded.role === storeConstant ? req.user.role === storeConstant : null;

      return next();
    } else {
      throw new UnauthenticatedError("Unauthorizated");
    }
  } else {
    throw new UnauthenticatedError("Unauthorizated");
  }
};

const optionalAuthenticateUserMiddleware = async (req, res, next) => {
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
      console.log("user ", user);
      // if (decoded.role === storeConstant) {
      //   req.user.role = storeConstant;
      // } else if (decoded.role === adminConstant) {
      //   req.user.role = adminConstant;
      // } else {
      //           req.user.role = userConstant;

      // }
      // decoded.role === userConstant ? (req.user.role = userConstant) : null;
      // decoded.role === userConstant ? (req.user.role = userConstant) : null;

      return next();
    } else {
      return next();
    }
  } else {
    return next();
  }
};
module.exports = {
  optionalAuthenticateUserMiddleware,
  authenticateUserMiddleware,
};
