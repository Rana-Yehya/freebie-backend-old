const { CountryZodModel } = require("../models/country-zod-model");
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

    // return res
    //   .status(404)
    //   .json({ isSuccess: false, message: "Country not found" });
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: country });
};

const createCountry = async (req, res, next) => {
  const { countryName, currencyCode, countryIsoCode } = req.body;
  const zodModel = CountryZodModel.safeParse({
    countryName: countryName,
    currencyCode: currencyCode,
    countryIsoCode: countryIsoCode,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const createdCountry = await prisma.country.create({
    data: {
      countryName: countryName,
      currencyCode: currencyCode,
      countryIsoCode: countryIsoCode,
    },
  });
  console.log(createdCountry);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdCountry });
};

const updateCountry = async (req, res, next) => {
  const { id } = req.params;
  const { countryName, currencyCode, countryIsoCode } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  const updatedCountry = await prisma.country.update({
    where: { id: id },
    data: {
      countryName: countryName || undefined,
      currencyCode: currencyCode || undefined,
      countryIsoCode: countryIsoCode || undefined,
    },
  });
  console.log(updatedCountry);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: updatedCountry });
};

const deleteCountry = async (req, res, next) => {
  const { id: CountryId } = req.params;
  const Country = await prisma.country.delete({
    where: { id: CountryId },
  });
  if (!Country) {
    return next(createCustomAPIError("Country not found", 404));
    // return res
    //   .status(404)
    //   .json({ isSuccess: false, message: "Country not found" });
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
