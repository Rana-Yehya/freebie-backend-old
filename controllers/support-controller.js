const { UserCartZodModel } = require("../models/user-cart-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { InfoZodModel } = require("../models/info-zod-model");
const { SupportZodModel } = require("../models/support-zod-model");
const getInboxes = async (req, res, next) => {
  const inbox = await prisma.inbox.findMany({
    // data: {
    //   slug: "problem",
    //   name: name,
    //   message: message,
    //   email: email,
    // },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: inbox.count, data: inbox });
};

const getSingleInbox = async (req, res, next) => {
  const { id: inboxId } = req.params;
  // const searchInCart =
  //   req.user != null && req.user.role === userConstant ? true : false;
  const inbox = await prisma.inbox.findUnique({
    where: { id: inboxId },
  });

  //  const productUser =  searchInCart ?
  // await prisma.userCart.findMany({
  //     where: {
  //       userId: req.user.id,
  //       productId: productId,
  //     },
  //   }) : undefined;

  // const productStock = await prisma.productStock.findMany({
  //   where: { productId: productId },
  // });
  if (!inbox) {
    throw new BadRequestError("Inbox not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: inbox });
};
const sendInbox = async (req, res, next) => {
  const { slug, message } = req.body;
  const zodModel = SupportZodModel.safeParse({
    slug: slug,
    message: message,
  });
  if (!zodModel.success) {
    console.log(zodModel.error.errors[0]);

    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  // console.log(req.user);
  const inbox = await prisma.inbox.create({
    data: {
      slug: slug,
      name: req.user.name,
      message: message,
      email: req.user.email,
    },
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, message: "Support Ticket Sent Successfully" });
};

const deleteInbox = async (req, res, next) => {
  await prisma.inbox.delete({
    where: {
      id: req.params.id,
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Inbox Deleted Successfully" });
};
module.exports = {
  getInboxes,
  getSingleInbox,
  sendInbox,
  deleteInbox,
};
