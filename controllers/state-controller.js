const { StateZodModel } = require("../models/state-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllCountryStates = async (req, res, next) => {
  if (!req.query.id) {
    throw new BadRequestError("Please provide country id");
  }
  const states = await prisma.state.findMany({
    where: { countryId: req.query.id },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: states.length, data: states });
};
const getState = async (req, res, next) => {
  const { id: stateId } = req.params;
  const state = await prisma.state.findUnique({
    where: { id: stateId },
  });
  if (!state) {
    throw new BadRequestError("State not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: state });
};

const createState = async (req, res, next) => {
  const { name, countryId } = req.body;
  const zodModel = StateZodModel.safeParse({
    name: name,
    countryId: countryId,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const country = await prisma.country.findUnique({
    where: { id: countryId },
  });
  if (!country) {
    throw new BadRequestError("Country not found");
  }

  const createdState = await prisma.state.create({
    data: {
      name: name,
      countryId: countryId,
    },
  });
  console.log(createdState);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdState });
};

const updateState = async (req, res, next) => {
  const { id } = req.params;
  const { name, countryId } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  if (countryId) {
    const country = await prisma.country.findUnique({
      where: { id: countryId },
    });
    if (!country) {
      throw new BadRequestError("Country not found");
    }
  }
  const updatedState = await prisma.state.update({
    where: { id: id },
    data: {
      name: name || undefined,
      countryId: countryId || undefined,
    },
  });
  console.log(updatedState);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: updatedState });
};

const deleteState = async (req, res, next) => {
  const { id: StateId } = req.params;
  const state = await prisma.state.delete({
    where: { id: StateId },
  });
  if (!state) {
    throw new BadRequestError("State not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "State deleted successfully" });
};

module.exports = {
  getAllCountryStates,
  getState,
  createState,
  updateState,
  deleteState,
};
