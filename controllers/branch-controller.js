const { prisma } = require("../config/prisma");
const { phone } = require("phone");

const { BranchZodModel } = require("../models/branch-zod-model");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { storeConstant } = require("../config/constants");
const getAllStoreBranches = async (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  console.log(req.query);
  console.log(req.user);

  if (!(req.user != undefined && req.user.role === storeConstant)) {
    if (!id) {
      // console.log("here");
      throw new BadRequestError("Please provide store id");
    }
    // console.log(req.user.role === storeConstant);
    // console.log(req.user != undefined);
    // console.log("There");
    // throw new BadRequestError("Please provide store id");
  }
  // store -> id
  // others -> id in query

  // console.log(req.user);
  const branches = await prisma.branch.findMany({
    where: {
      storeId: id || req.user.id,
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
  const branch = await prisma.branch.findUnique({
    where: { id: branchId },
    include: {
      location: true,
    },
  });
  if (!branch) {
    throw new BadRequestError("Branch not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: branch });
};

const createBranch = async (req, res, next) => {
  const id = req.query.id;
  if (!(req.user != undefined && req.user.role === storeConstant)) {
    if (!id) {
      throw new BadRequestError("Please provide store id");
    }
  }
  // if (!(req.user && req.user.role === store)) {
  //   throw new BadRequestError("Please provide store id");
  // } else {
  // 4025e15e-d6ce-4a6b-8afa-8cf9fdf06d1c

  // }
  const { address, phone: phoneNumber, stateId } = req.body;
  const zodModel = BranchZodModel.safeParse({
    // address: address,
    // countryId: countryId,
    phone: phoneNumber,
    location: {
      address: address,
      stateId: stateId,
    },

    // stateId: stateId,
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const isPhoneValid = phone(phoneNumber.toString());

  if (isPhoneValid.isValid != true) {
    throw new BadRequestError("The phone number is not correct");
  }
  // if (req.user.role !== storeConstant) {
  //   const store = await prisma.store.findUnique({
  //     where: { id: id || req.user.id },
  //   });
  //   if (!store) {
  //     throw new BadRequestError("Store not found");
  //   }
  // }
  // const state = await prisma.state.findUnique({
  //   where: { id: stateId },
  // });
  // if (!state) {
  //   throw new BadRequestError("State not found");
  // }

  const createdBranch = await prisma.branch.create({
    data: {
      // countryId: countryId,
      phone: phoneNumber,
      location: {
        create: {
          state: { connect: { id: stateId } },
          address: address,
        },
      },
      store: { connect: { id: id || req.user.id } },
      // stateId: stateId,

      // workHours: [],
    },
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdBranch });
};

const updateBranch = async (req, res, next) => {
  const { id } = req.params;
  const { address, phone: phoneNumber, stateId } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  const updatedBranch = await prisma.branch.update({
    where: { id: id },
    data: {
      phone: phoneNumber || undefined,
      location: {
        update: {
          state: { connect: { id: stateId || undefined } },
          address: address || undefined,
        },
      },
      // storeId: id || req.user.id,
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: updatedBranch });
};

const deleteBranch = async (req, res, next) => {
  const { id: branchId } = req.params;
  const branch = await prisma.branch.delete({
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
