const { adminConstant } = require("../config/constants");
const { prisma } = require("../config/prisma");
const { UnauthorizatedError } = require("../errors");

const adminInvalidRegisterationMiddleware = async (req, res, next) => {
  const { role } = req.body;

  if (role === adminConstant) {
    const userInDB = await prisma.user.findFirst({
      where: { role: adminConstant },
    });
    if (!userInDB) {
      next();
    } else {
      throw new UnauthorizatedError("Unauthorized to perform this action");
    }
  } else {
    console.log("nicht admin");

    next();
  }
};
module.exports = { adminInvalidRegisterationMiddleware };
