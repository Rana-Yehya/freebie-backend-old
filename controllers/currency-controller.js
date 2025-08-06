const { CurrencyZodModel } = require("../models/currency-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllCountries = async (req, res, next) => {
  const country = await prisma.country.findMany();
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: country.length, data: country });
};
const getCountry = async (req, res, next) => {
  const { id: countryId } = req.params;
  const country = await prisma.country.findUnique({
    where: { id: countryId },
  });
  if (!country) {
    throw new BadRequestError("Country not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: country });
};

const createCountry = async (req, res, next) => {
  const {
    countryName,
    countryNameEn,
    countryNameAr,
    currencyCode,
    countryIsoCode,
  } = req.body;
  const zodModel = CreateCountryZodModel.safeParse({
    countryName: {
      default: countryName,
      en: countryNameEn,
      ar: countryNameAr,
    },
    currencyCode: currencyCode,
    countryIsoCode: countryIsoCode,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const createdCountry = await prisma.country.create({
    data: {
      name: {
        create: {
          default: countryName,
          en: countryNameEn || countryName,
          ar: countryNameAr || countryName,
        },
      },
      currencyCode: currencyCode,
      countryIsoCode: countryIsoCode,
    },
  });
  console.log(createdCountry);

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Country created successfully",
    data: createdCountry,
  });
};

const updateCountry = async (req, res, next) => {
  const { id } = req.params;
  const {
    countryName,
    countryNameEn,
    countryNameAr,
    currencyCode,
    countryIsoCode,
  } = req.body;

  if (!id) {
    throw new BadRequestError("Please send a country ID");
  }
  const updatedCountry = await prisma.country.update({
    where: { id: id },
    data: {
      name: {
        update: {
          default: countryName || undefined,
          en: countryNameEn || undefined,
          ar: countryNameAr || undefined,
        },
      },
      currencyCode: currencyCode || undefined,
      countryIsoCode: countryIsoCode || undefined,
    },
  });
  console.log(updatedCountry);

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Country updated successfully",
    data: updatedCountry,
  });
};

const deleteCountry = async (req, res, next) => {
  const { id: CountryId } = req.params;
  const country = await prisma.country.delete({
    where: { id: CountryId },
  });
  if (!country) {
    throw new BadRequestError("Country not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Country deleted successfully" });
};

module.exports = {
  getAllCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
};
