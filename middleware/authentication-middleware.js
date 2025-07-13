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
    //{ userId: user.id, sessionId: session.id }
    if (decoded) {
      const session = await prisma.session.findUnique({
        where: { id: decoded.sessionId },
        include: {
          user: true,
          store: true,
          admin: true,
        },
      });
      if (
        (session.admin &&
          decoded.role == adminConstant &&
          session.admin.id == decoded.userId) ||
        (session.user &&
          decoded.role == userConstant &&
          session.user.id == decoded.userId) ||
        (session.store &&
          decoded.role == storeConstant &&
          session.store.id == decoded.userId)
      ) {
        req.user = session.admin || session.user || session.store;
        req.session = session.id;
        req.fcmToken = session.fcmToken;
        req.role = decoded.role;
      } else {
        throw new UnauthenticatedError("Unauthorizated");
      }
      // : await prisma.user.findUnique({
      //     where: { id: decoded.userId },
      //     include: {
      //       userCountry: true,
      //       userState: true,
      //     },
      //   });
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
      // if (
      //   !user ||
      //   !user.accessTokenSecret ||
      //   !decoded.accessTokenSecret ||
      //   user.accessTokenSecret.toString() !=
      //     decoded.accessTokenSecret.toString()
      // ) {
      //   throw new UnauthenticatedError("Unauthorizated");
      // }
      // const { userId, email } = decoded;

      // req.user = user;
      // decoded.role === storeConstant ? req.user.role === storeConstant : null;

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
      const user = await prisma.session.findUnique({
        where: { id: decoded.sessionId },
        select: {
          user: true,
          store: true,
          admin: true,
        },
      });
      if (
        (user.admin &&
          decoded.role == adminConstant &&
          user.admin.id == decoded.userId) ||
        (user.user &&
          decoded.role == userConstant &&
          user.user.id == decoded.userId) ||
        (user.store &&
          decoded.role == storeConstant &&
          user.store.id == decoded.userId)
      ) {
        req.user = user;
        req.role = decoded.role;
      } else {
        throw new UnauthenticatedError("Unauthorizated");
      }
      // const { userId, email } = decoded;

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
