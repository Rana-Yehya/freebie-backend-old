const { admin } = require("../config/constants");

const adminInvalidRegisterationMiddleware = async (req, res, next) => {
  console.log("role");

  const { role } = req.body;
  console.log(role);
  console.log(admin);
  console.log(role === admin);

  if (role === admin) {
    console.log("admin");
    const userInDB = await prisma.user.findUnique({
      where: { role: admin },
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
