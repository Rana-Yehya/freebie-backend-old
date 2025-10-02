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
  console.log(req.user);
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
  // let id = req.query.id;
  // if (req.user != undefined && req.user.role === storeConstant) {
  //   id = req.user.id;
  // }
  console.log(req.user);
  console.log(req.user.subscription);
  console.log(req.user.subscription.planLimit);
  if (
    req.user.subscription.maxBranches >=
    req.user.subscription.planLimit.maxBranches
  ) {
    throw new BadRequestError(
      "You have reached the maximum number of branches allowed for your subscription"
    );
  }
  const { address, phone: phoneNumber, stateId } = req.body;
  const zodModel = CreateBranchZodModel.safeParse({
    storeId: req.user.id,
    phone: phoneNumber,
    location: {
      address: address,
      stateId: stateId,
    },
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const createdBranch = await prisma.store.update({
    where: { id: req.user.id },
    data: {
      subscription: { update: { maxBranches: { increment: 1 } } },
      branches: {
        create: {
          phone: phoneNumber,
          location: {
            create: {
              state: { connect: { id: stateId } },
              address: address,
            },
          },
          // store: { connect: { id: req.user.id } },
        },
      },
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
  if (!branchId) {
    throw new BadRequestError("Please enter a branch id");
  }
  const ordersInStore = await prisma.order.findFirst({
    where: {
      AND: [
        {
          productOrder: {
            every: {
              productStock: { branch: { id: branchId } },
            },
          },
        },
        {
          productOrder: {
            every: {
              status: { notIn: [OrderStatus.DELIVERED, OrderStatus.CANCELLED] },
            },
          },
        },
        // { productOrder: { every: { status: { not: "pending" } } } },
      ],
    },
  });
  if (ordersInStore) {
    throw new BadRequestError("Store has orders in progress");
  }

  const branch = await prisma.store.update({
    where: { id: req.user.id },
    data: {
      subscription: { update: { maxBranches: { decrement: 1 } } },
      branches: {
        delete: {
          id: branchId,
          // store: { id: req.user.id },
        },
      },
    },
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
