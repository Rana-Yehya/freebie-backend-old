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

const approveProduct = async (req, res) => {
  const { productId } = req.body;

  await prisma.product.update({
    where: { id: productId },
    data: { isAcceptedByAdmin: true },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Product approved successfully",
  });
};
const getAllProducts = async (req, res, next) => {
  // let isAcceptedByAdmin = true;
  // if (req.user.role === adminConstant) {
  //   isAcceptedByAdmin = null;
  // }
  const { page = 1, limit = 10 } = req.query;

  const product = await prisma.product.findMany({
    take: limit,
    skip: (page - 1) * limit,
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
const getAllStores = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const stores = await prisma.store.findMany({
    take: limit,
    skip: (page - 1) * limit,
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
  approveProduct,
  getAllStores,
  getAllProducts,
};
