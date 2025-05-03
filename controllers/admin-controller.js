const { StatusCodes } = require("http-status-codes");
const { prisma } = require("../config/prisma");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { StoreZodModel } = require("../models/store-zod-model");

const { createAccessJWT, createRefreshJWT } = require("../utils/jwt-utils");
const { passwordEncrypt, passwordCompare } = require("../utils/password-utils");
const { admin } = require("../config/constants");
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
  const stores = await prisma.store.findMany();
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: stores.length, data: stores });
};
module.exports = {
  approveStore,
  getAllStores,
};
