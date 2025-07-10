const { CityZodModel } = require("../models/city-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllStateCities = async (req, res, next) => {
  if (!req.query.id) {
    throw new BadRequestError("Please provide state id");
  }
  const cities = await prisma.city.findMany({
    where: { stateId: req.query.id },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: cities.length, data: cities });
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
  const { name, nameEn, nameAr, stateId } = req.body;
  const zodModel = CityZodModel.safeParse({
    name: {
      defaultName: name,
      nameEn: nameEn,
      nameAr: nameAr,
    },
    stateId: stateId,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  // const country = await prisma.state.findUnique({
  //   where: { id: stateId },
  // });
  // if (!country) {
  //   throw new BadRequestError("Country not found");
  // }

  const createdCity = await prisma.city.create({
    data: {
      name: {
        create: {
          defaultName: name,
          nameEn: nameEn || name,
          nameAr: nameAr || name,
        },
      },
      state: { connect: { id: stateId } },
    },
  });
  console.log(createdCity);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdCity });
};

const updateCity = async (req, res, next) => {
  const { id } = req.params;
  const { name, nameEn, nameAr, stateId } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  // if (stateId) {
  //   const country = await prisma.state.findUnique({
  //     where: { id: stateId },
  //   });
  //   if (!country) {
  //     throw new BadRequestError("State not found");
  //   }
  // }
  const updatedCity = await prisma.city.update({
    where: { id: id },
    data: {
      update: {
        defaultName: name || undefined,
        nameEn: nameEn || undefined,
        nameAr: nameAr || undefined,
      },
      state: { connect: { id: stateId || undefined } },
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
  getAllStateCities,
  getCity,
  createCity,
  updateCity,
  deleteCity,
};
