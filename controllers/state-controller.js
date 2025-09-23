const { CreateStateZodModel } = require("../models/create-state-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllCountryStates = async (req, res, next) => {
  if (!req.query.id) {
    throw new BadRequestError("Please provide country ID");
  }
  const states = await prisma.state.findMany({
    where: { countryId: req.query.id },
    include: { name: true },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: states.length, data: states });
};
const getState = async (req, res, next) => {
  const { id: stateId } = req.params;
  const state = await prisma.state.findUnique({
    where: { id: stateId },
    include: {
      country: true,
      name: true,
    },
  });
  if (!state) {
    throw new BadRequestError("State not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: state });
};

const createState = async (req, res, next) => {
  const { name, nameEn, nameAr, countryId } = req.body;
  const zodModel = CreateStateZodModel.safeParse({
    name: {
      default: name,
      en: nameEn,
      ar: nameAr,
    },
    countryId: countryId,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  // const country = await prisma.country.findUnique({
  //   where: { id: countryId },
  // });
  // if (!country) {
  //   throw new BadRequestError("Country not found");
  // }
  /*
    defaultName: name,
          nameEn: nameEn || name,
          nameAr: nameAr || name,
*/
  const createdState = await prisma.state.create({
    data: {
      name: {
        create: {
          default: name,
          en: nameEn || name,
          ar: nameAr || name,
        },
      },
      // countryId: countryId,
      country: { connect: { id: countryId } },

      // asfd: "Dadfwf",
    },
  });
  console.log(createdState);

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: i18n.__("State created successfully"),
    data: createdState,
  });
};

const updateState = async (req, res, next) => {
  const { id } = req.params;
  const { name, nameEn, nameAr, countryId } = req.body;

  if (!id) {
    throw new BadRequestError("Please send a state ID");
  }
  // if (countryId) {
  //   const country = await prisma.country.findUnique({
  //     where: { id: countryId },
  //   });
  //   if (!country) {
  //     throw new BadRequestError("Country not found");
  //   }
  // }
  const updatedState = await prisma.state.update({
    where: { id: id },
    data: {
      name: {
        update: {
          default: name || undefined,
          en: nameEn || undefined,
          ar: nameAr || undefined,
        },
      },
      country:
        countryId != undefined
          ? {
              connect: { id: countryId },
            }
          : {},
    },
  });
  console.log(updatedState);

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("State updated successfully"),
    data: updatedState,
  });
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
