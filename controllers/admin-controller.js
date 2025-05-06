const { StatusCodes } = require("http-status-codes");
const { prisma } = require("../config/prisma");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const approveStore = async (req, res) => {
  const { storeId } = req.body;
  //TODO AM I IN NEED TO CHECK EMAIL

  await prisma.store.update({
    where: { id: storeId },
    data: { isApprovedByAdmin: true },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Store approved successfully",
  });
};
const getAllStores = async (req, res, next) => {
  const stores = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
      bio: false,
      logo: true,
      banner: false,
      phone: true,
      email: true,
      role: true,
      isApprovedByAdmin: true,
      isFreezed: true,
      isBanned: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
      paymentId: false,
      transactions: false,
      refreshTokenSecret: false,
      accessTokenSecret: false,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: stores.length, data: stores });
};
module.exports = {
  approveStore,
  getAllStores,
};
