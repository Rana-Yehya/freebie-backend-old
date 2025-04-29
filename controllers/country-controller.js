const { CountryZodModel } = require("../models/country-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const getAllCountries = async (req, res, next) => {
  const country = await prisma.country.findMany();
  return res.json({ isSuccess: true, count: country.length, data: country });
};
const getCountry = async (req, res, next) => {
  const { id: countryId } = req.params;
  const Country = await prisma.Country.findUnique({
    where: { id: parseInt(countryId) },
  });
  if (!country) {
    throw new BadRequestError("Country not found");

    // return res
    //   .status(404)
    //   .json({ isSuccess: false, message: "Country not found" });
  }
  return res.json({ isSuccess: true, data: country });
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
  console.log("ghrhrh ");

  console.log(createdCountry);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, country: createdCountry });
};

const updateCountry = async (req, res, next) => {
  //   let isCompleted = false;
  //   const { id: CountryId } = req.params;
  //   const { name, completed } = req.body;
  //   if (completed) {
  //     isCompleted = completed;
  //   }
  //   const zodModel = CountryZodMode.safeParse({
  //     name: name,
  //     completed: isCompleted,
  //   });
  //   if (!zodModel.success) {
  //     return next(createCustomAPIError(zodModel.error.errors[0].message, 400));
  //   }
  //   const Country = await prisma.Country.update({
  //     where: { id: parseInt(CountryId) },
  //     data: { name, completed },
  //   });
  //   if (!Country) {
  //     return next(createCustomAPIError("Country not found", 404));
  //     // return res
  //     //   .status(404)
  //     //   .json({ isSuccess: false, message: "Country not found" });
  //   }
  //   return res.json({ isSuccess: true, data: Country });
};

const deleteCountry = async (req, res, next) => {
  //   const { id: CountryId } = req.params;
  //   const Country = await prisma.Country.delete({
  //     where: { id: parseInt(CountryId) },
  //   });
  //   if (!Country) {
  //     return next(createCustomAPIError("Country not found", 404));
  //     // return res
  //     //   .status(404)
  //     //   .json({ isSuccess: false, message: "Country not found" });
  //   }
  //   return res.json({ isSuccess: true, data: Country });
};

module.exports = {
  getAllCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
};
