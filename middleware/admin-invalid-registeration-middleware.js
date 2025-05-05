const { adminConstant } = require("../config/constants");

const adminInvalidRegisterationMiddleware = async (req, res, next) => {
  const { role } = req.body;

  if (role === adminConstant) {
    const userInDB = await prisma.user.findUnique({
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
