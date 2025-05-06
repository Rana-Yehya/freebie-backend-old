const { CityZodModel } = require("../models/city-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllCartItems = async (req, res, next) => {
  const citys = await prisma.city.findMany({
    where: { stateId: req.query.id },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: citys.length, data: citys });
};
const getCity = async (req, res, next) => {
  const { id: cityId } = req.params;
  const city = await prisma.city.findUnique({
    where: { id: cityId },
  });
  if (!city) {
    throw new BadRequestError("City not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: city });
};

const createCity = async (req, res, next) => {
  const { name, stateId } = req.body;
  const zodModel = CityZodModel.safeParse({
    name: name,
    stateId: stateId,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const country = await prisma.state.findUnique({
    where: { id: stateId },
  });
  if (!country) {
    throw new BadRequestError("Country not found");
  }

  const createdCity = await prisma.city.create({
    data: {
      name: name,
      stateId: stateId,
    },
  });
  console.log(createdCity);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdCity });
};

const updateCity = async (req, res, next) => {
  const { id } = req.params;
  const { name, stateId } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  if (stateId) {
    const country = await prisma.state.findUnique({
      where: { id: stateId },
    });
    if (!country) {
      throw new BadRequestError("State not found");
    }
  }
  const updatedCity = await prisma.city.update({
    where: { id: id },
    data: {
      name: name || undefined,
      stateId: stateId || undefined,
    },
  });
  console.log(updatedCity);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: updatedCity });
};

const deleteCity = async (req, res, next) => {
  const { id: CityId } = req.params;
  const city = await prisma.city.delete({
    where: { id: CityId },
  });
  if (!city) {
    throw new BadRequestError("City not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "City deleted successfully" });
};

module.exports = {
  getAllCartItems,
  deleteCartItem,
  createCart,
  updateCartQuantity,
};
