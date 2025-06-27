const { UserCartZodModel } = require("../models/user-cart-zod-model");
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
  });

  return res.status(StatusCodes.OK).json({ isSuccess: true, data: aboutInfo });
};
const createInfo = async (req, res, next) => {
  const { slug, data } = req.body;
  const zodModel = InfoZodModel.safeParse({
    slug: slug,
    data: data,
  });
  if (!zodModel.success) {
    console.log(zodModel.error.errors[0]);

    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const aboutInfo = await prisma.info.upsert({
    where: {
      slug: slug,
    },
    update: {
      // slug: slug,
      data: data,
    },
    create: {
      slug: slug,
      data: data,
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
  });

  return res.status(StatusCodes.OK).json({ isSuccess: true, data: refundInfo });
};

module.exports = {
  aboutApp,
  privacyPolicy,
  refundPolicy,
  termsAndConditions,
  createInfo,
};
