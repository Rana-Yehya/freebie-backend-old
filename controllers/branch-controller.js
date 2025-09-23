const { prisma } = require("../config/prisma");
const i18n = require("i18n");

const { CreateBranchZodModel } = require("../models/create-branch-zod-model");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { storeConstant } = require("../config/constants");
const { UpdateBranchZodModel } = require("../models/update-branch-zod-model");
const { OrderStatus } = require("../generated/prisma");
const getAllStoreBranches = async (req, res, next) => {
  let id = req.query.id;
  if (req.user != undefined && req.user.role === storeConstant) {
    id = req.user.id;
    // if (!id) {
    //   throw new BadRequestError("Please provide store ID");
    // }
  }
  if (!id) {
    // console.log("here");
    throw new BadRequestError("Please provide store id");
  }

  const branches = await prisma.branch.findMany({
    where: {
      storeId: id,
    },
    include: {
      location: true,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: branches.length, data: branches });
};
const getBranch = async (req, res, next) => {
  const { id: branchId } = req.params;
  if (!branchId) {
    throw new BadRequestError("Please enter a branch id");
  }
  const branch = await prisma.branch.findUnique({
    where: { id: branchId },
    include: {
      location: true,
    },
  });
  if (!branch) {
    throw new NotFoundError("Branch not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: branch });
};

const createBranch = async (req, res, next) => {
  let id = req.query.id;
  if (req.user != undefined && req.user.role === storeConstant) {
    id = req.user.id;
  }
  const { address, phone: phoneNumber, stateId } = req.body;
  const zodModel = CreateBranchZodModel.safeParse({
    storeId: id,
    phone: phoneNumber,
    location: {
      address: address,
      stateId: stateId,
    },
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const createdBranch = await prisma.branch.create({
    data: {
      phone: phoneNumber,
      location: {
        create: {
          state: { connect: { id: stateId } },
          address: address,
        },
      },
      store: { connect: { id: id } },
    },
  });

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: i18n.__("Branch created successfully"),
    data: createdBranch,
  });
};

const updateBranch = async (req, res, next) => {
  const { id } = req.params;
  const { address, phone: phoneNumber, stateId } = req.body;

  const zodModel = UpdateBranchZodModel.safeParse({
    branchId: id,
    phone: phoneNumber,
    location: {
      address: address,
      stateId: stateId,
    },
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const updatedBranch = await prisma.branch.update({
    where: { id: id },
    data: {
      phone: phoneNumber || undefined,
      location: {
        update: {
          state: stateId != undefined ? { connect: { id: stateId } } : {},
          address: address || undefined,
        },
      },
    },
  });
  if (!updatedBranch) {
    throw new NotFoundError("Branch not found");
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Branch updated successfully"),
    data: updatedBranch,
  });
};

const deleteBranch = async (req, res, next) => {
  const { id: branchId } = req.params;
  // TODO SHOULD I CHECK ON THE ONGOING ORDERS
  // const productOrder = await prisma.productOrder.findFirst({
  //  where: {
  //   status: {notIn: [OrderStatus.DELIVERED, OrderStatus.CANCELLED]},
  //   variant:
  //  }
  // }
  // )
  if (!branchId) {
    throw new BadRequestError("Please enter a branch id");
  }
  const branch = await prisma.branch.delete({
    where: { id: branchId },
  });
  if (!branch) {
    throw new NotFoundError("Branch not found");
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
