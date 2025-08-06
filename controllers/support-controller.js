const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
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
  if (!inboxId) {
    throw new BadRequestError("Please enter an inbox id");
  }
  const inbox = await prisma.inbox.findUnique({
    where: { id: inboxId },
  });
  if (!inbox) {
    throw new NotFoundError("Inbox not found");
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
    .json({ isSuccess: true, message: "Support Ticket sent successfully" });
};

const deleteInbox = async (req, res, next) => {
  const { id: inboxId } = req.params;
  if (!inboxId) {
    throw new BadRequestError("Please enter an inbox id");
  }
  await prisma.inbox.delete({
    where: {
      id: inboxId,
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Inbox deleted successfully" });
};
module.exports = {
  getInboxes,
  getSingleInbox,
  sendInbox,
  deleteInbox,
};
