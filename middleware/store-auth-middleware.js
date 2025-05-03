const { UnauthorizatedError, UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils/jwt-utils");
const { prisma } = require("../config/prisma");
// const { sendTokenToCookies } = require("../utils/jwt-utils");

// const UserToken = require("../models/user-token-model");
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
    if (decoded) {
      const user = await prisma.store.findUnique({
        where: { id: decoded.userId },
      });
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

    // const decoded = isTokenValid(refreshToken);
    // const { userId, email } = decoded;
    // req.user = { userId: userId, email, name: user.name, role: user.role };
    // const existingToken = await UserToken.findOne({
    //   user: userId,
    //   refreshToken,
    // });
    // if (!existingToken || !existingToken?.isValid) {
    //   throw new UnauthenticatedError("Invalid Credentials");
    // }
    // sendTokenToCookies({ res, user: req.user, refreshToken });
    // return next();
  }
  // } catch (e) {
  //   console.log(e);
  //   throw new UnauthenticatedError("Invalid Credentials");
  // }
};

module.exports = { authenticateMiddleware };
