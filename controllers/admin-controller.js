const { StatusCodes } = require("http-status-codes");
const { prisma } = require("../config/prisma");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const {
  sendNotificationToAllUsersHelper,
} = require("../helpers/notifications/send-notificaton-to-all-users-helper");
const {
  StoreStatus,
  ProductStatus,
  ProductTags,
} = require("../generated/prisma");

const approveStore = async (req, res) => {
  const { storeId } = req.body;
  //TODO AM I IN NEED TO CHECK EMAIL

  await prisma.store.update({
    where: { id: storeId },
    data: { status: StoreStatus.APPROVED },
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
    data: { status: ProductStatus.APPROVED },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Product approved successfully",
  });
};
const setProductTag = async (req, res) => {
  const { productId, tag } = req.body;
  const tags =
    tag == "featured"
      ? ProductTags.FEATURED
      : tag == "popular"
      ? ProductTags.POPULAR
      : undefined;
  const product = await prisma.product.update({
    where: { id: productId },
    data: { tags: tags },
  });
  if (!product) {
    throw new BadRequestError("Product not found");
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Product approved successfully",
  });
};

const getAllUsers = async (req, res, next) => {
  // let isAcceptedByAdmin = true;
  // if (req.user.role === adminConstant) {
  //   isAcceptedByAdmin = null;
  // }
  const { page = 1, limit = 10 } = req.query;

  const user = await prisma.user.findMany({
    take: limit,
    skip: (page - 1) * limit,
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: user.length, data: user });
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
      createdAt: true,
      updatedAt: true,
      transactions: false,
      sessions: false,
      status: true,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: stores.length, data: stores });
};
const sendNotificationToAllUsers = async (req, res, next) => {
  const { title, body } = req.body;
  if (title == null || body == null) {
    throw new BadRequestError("Title and body are required");
  }
  const userTokens = await prisma.user.findMany({
    select: { sessions: { select: { fcmToken: true } } },
  });
  const token = userTokens.map((user) => user.sessions.fcmToken);
  // console.log(x);
  // console.log(userTokens);
  // const token = [
  //   "egR_fzaMRZ2V8RgFdDkPFU:APA91bGb9kcPUzh9PBVsQaVlLIvfYXsZYy6ymjrCBOMhtKDPUuBYSeHsbJosBiMb-CpW7B3RYIzk_Z3YYBJfFg2x1l0EyanfHDfLH5qi85K_Lzg6ValL5hY",
  //   "c7SGXJf0QMC0biYtBPifMG:APA91bF_N4m1jFEEyByx_0_0cnCsCSI8mQXsMQRyQRdMoQ1jJW4NiSa0My16RThSDga2_gFENDUqu82_auZxpqjClBy5dXHKd7PYLVkfKtKMOhRirkUQd90",
  // ];
  await sendNotificationToAllUsersHelper({
    title: title,
    body: body,
    fcmTokens: token,
  });

  // return res.status(StatusCodes.OK).json({ isSuccess: true });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Notification sent successfully" });
};
module.exports = {
  approveStore,
  approveProduct,
  getAllStores,
  getAllProducts,
  getAllUsers,
  sendNotificationToAllUsers,
  setProductTag,
};
