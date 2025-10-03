const { CreateAdZodModel } = require("../models/create-Ad-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllCountryAds = async (req, res, next) => {
  if (!req.query.id) {
    throw new BadRequestError("Please provide country ID");
  }
  const Ads = await prisma.Ad.findMany({
    where: { countryId: req.query.id },
    include: { name: true },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: Ads.length, data: Ads });
};
const getAd = async (req, res, next) => {
  const { id: AdId } = req.params;
  const Ad = await prisma.Ad.findUnique({
    where: { id: AdId },
    include: {
      country: true,
      name: true,
    },
  });
  if (!Ad) {
    throw new BadRequestError("Ad not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: Ad });
};

const createAd = async (req, res, next) => {
  const { name, nameEn, nameAr, countryId } = req.body;
  const zodModel = CreateAdZodModel.safeParse({
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
  const createdAd = await prisma.Ad.create({
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
  console.log(createdAd);

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: i18n.__("Ad created successfully"),
    data: createdAd,
  });
};

const updateAd = async (req, res, next) => {
  const { id } = req.params;
  const { name, nameEn, nameAr, countryId } = req.body;

  if (!id) {
    throw new BadRequestError("Please send a Ad ID");
  }
  // if (countryId) {
  //   const country = await prisma.country.findUnique({
  //     where: { id: countryId },
  //   });
  //   if (!country) {
  //     throw new BadRequestError("Country not found");
  //   }
  // }
  const updatedAd = await prisma.Ad.update({
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
  console.log(updatedAd);

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Ad updated successfully"),
    data: updatedAd,
  });
};

const deleteAd = async (req, res, next) => {
  const { id: AdId } = req.params;
  const Ad = await prisma.Ad.delete({
    where: { id: AdId },
  });
  if (!Ad) {
    throw new BadRequestError("Ad not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Ad deleted successfully" });
};

module.exports = {
  getAllCountryAds,
  getAd,
  createAd,
  updateAd,
  deleteAd,
};
