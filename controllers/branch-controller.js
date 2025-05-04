const { prisma } = require("../config/prisma");
const { phone } = require("phone");

const { BranchZodModel } = require("../models/branch-zod-model");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { store } = require("../config/constants");
const getAllStoreBranches = async (req, res, next) => {
  const { id } = req.query;
  if (!(id || req.user)) {
    throw new BadRequestError("Please provide store id");
  }
  if (!(req.user && req.user.role === store)) {
    throw new BadRequestError("Please provide store id");
  }
  // console.log(req.user);
  const branches = await prisma.branches.findMany({
    where: {
      storeId: id || req.user.id,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: branches.length, data: branches });
};
const getBranch = async (req, res, next) => {
  const { id: branchId } = req.params;
  const branch = await prisma.branches.findUnique({
    where: { id: branchId },
  });
  if (!branch) {
    throw new BadRequestError("Branch not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: branch });
};

const createBranch = async (req, res, next) => {
  const { id } = req.query;
  if (!(id || req.user)) {
    throw new BadRequestError("Please provide store id");
  }
  if (!(req.user && req.user.role === store)) {
    throw new BadRequestError("Please provide store id");
  }
  const { address, countryId, phone: phoneNumber } = req.body;
  const zodModel = BranchZodModel.safeParse({
    address: address,
    countryId: countryId,
    phone: phoneNumber,
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const isPhoneValid = phone(phoneNumber.toString());

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  const createdBranch = await prisma.branches.create({
    data: {
      address: address,
      countryId: countryId,
      phone: phoneNumber,
      storeId: id || req.user.id,
    },
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdBranch });
};

const updateBranch = async (req, res, next) => {
  const { id } = req.params;
  const { address, countryId, phone: phoneNumber } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  const updatedBranch = await prisma.branches.update({
    where: { id: id },
    data: {
      address: address || undefined,
      countryId: countryId || undefined,
      phone: phoneNumber || undefined,
      // storeId: id || req.user.id,
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: updatedBranch });
};

const deleteBranch = async (req, res, next) => {
  const { id: branchId } = req.params;
  const branch = await prisma.branches.delete({
    where: { id: branchId },
  });
  if (!branch) {
    throw new BadRequestError("Branch not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Branch deleted successfully" });
};

module.exports = {
  getAllStoreBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
};
