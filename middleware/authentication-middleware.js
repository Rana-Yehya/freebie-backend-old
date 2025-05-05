const { UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt-utils");
const { prisma } = require("../config/prisma");
const { storeConstant } = require("../config/constants");

const authenticateMiddleware = async (req, res, next) => {
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

      if (user.accessTokenSecret !== decoded.accessTokenSecret) {
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

module.exports = { authenticateMiddleware };
