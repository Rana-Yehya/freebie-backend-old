const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { InfoZodModel } = require("../models/info-zod-model");

const aboutApp = async (req, res, next) => {
  // }
  // productUser[i].userCartId = req.user.id;
  const aboutInfo = await prisma.info.findUnique({
    where: {
      slug: "about",
    },
    include: { name: true },
  });

  return res.status(StatusCodes.OK).json({ isSuccess: true, data: aboutInfo });
};
const createInfo = async (req, res, next) => {
  const { slug, data, dataEn, dataAr } = req.body;
  const zodModel = InfoZodModel.safeParse({
    slug: slug,
    data: {
      default: data,
      en: dataEn,
      ar: dataAr,
    },
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const aboutInfo = await prisma.info.upsert({
    where: {
      slug: slug,
    },
    update: {
      // slug: slug,
      name: {
        update: {
          default: data || undefined,
          en: dataEn || undefined,
          ar: dataAr || undefined,
        },
      },
    },
    create: {
      slug: slug,
      name: {
        create: {
          default: data,
          en: dataEn || data,
          ar: dataAr || data,
        },
      },
    },
  });

  return res.status(StatusCodes.OK).json({ isSuccess: true, data: aboutInfo });
};
const privacyPolicy = async (req, res, next) => {
  // }
  // productUser[i].userCartId = req.user.id;
  const privacyInfo = await prisma.info.findUnique({
    where: {
      slug: "privacy",
    },
    include: { name: true },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: privacyInfo });
};
const termsAndConditions = async (req, res, next) => {
  // }
  // productUser[i].userCartId = req.user.id;
  const terms = await prisma.info.findUnique({
    where: {
      slug: "terms",
    },
    include: { name: true },
  });

  return res.status(StatusCodes.OK).json({ isSuccess: true, data: terms });
};
const refundPolicy = async (req, res, next) => {
  // }
  // productUser[i].userCartId = req.user.id;
  const refundInfo = await prisma.info.findUnique({
    where: {
      slug: "refund",
    },
    include: { name: true },
  });

  return res.status(StatusCodes.OK).json({ isSuccess: true, data: refundInfo });
};

const shippingPolicy = async (req, res, next) => {
  // }
  // productUser[i].userCartId = req.user.id;
  const refundInfo = await prisma.info.findUnique({
    where: {
      slug: "shipping",
    },
    include: { name: true },
  });

  return res.status(StatusCodes.OK).json({ isSuccess: true, data: refundInfo });
};

module.exports = {
  aboutApp,
  privacyPolicy,
  refundPolicy,
  termsAndConditions,
  createInfo,
  shippingPolicy,
};
