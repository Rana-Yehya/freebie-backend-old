const { CreateAdZodModel } = require("../models/create-ad-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { TargetType } = require("../generated/prisma");
const { destroyImage } = require("../helpers/image-kit/delete-image");
const { UpdateAdZodModel } = require("../models/update-ad-zod-model");
const { uploadImage } = require("../helpers/image-kit/upload-image");

const getAllUserAds = async (req, res, next) => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(new Date().getDate() + 3));
  const ads = await prisma.adCampaign.findMany({
    where: {
      AND: [
        { startDate: { lte: startDate } },
        { endDate: { gte: endDate } },
        // { startDate: { gte: startStringToDate } },
        // { endDate: { lte: endDate } },
      ],
    },
    include: { image: true },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: ads.length, data: ads });
};
const getAllStoreAds = async (req, res, next) => {
  const ads = await prisma.adCampaign.findMany({
    where: { storeId: req.user.id },
    // select: { adCampaigns: true },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: ads.length, data: ads });
};
const getAd = async (req, res, next) => {
  const { id: adId } = req.params;
  const ad = await prisma.adCampaign.findUnique({
    where: { id: adId },
    include: {
      title: true,
      adImpressions: true,
      adClick: true,
      image: true,
    },
  });
  if (!ad) {
    throw new BadRequestError("Ad not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: ad });
};

const createAd = async (req, res, next) => {
  const {
    name,
    nameEn,
    nameAr,
    description,
    startDate,
    targetType,
    productId,
  } = req.body;
  const image = req.files == undefined ? undefined : req.files.image;

  const zodModel = CreateAdZodModel.safeParse({
    storeId: req.user.id,
    title: {
      default: name,
      en: nameEn,
      ar: nameAr,
    },
    description: description,
    image: image,
    startDate: startDate,
    targetType: targetType,
    productId: productId,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  if (
    req.user.subscription.adsPerWeek >=
    req.user.subscription.planLimit.adsPerWeek
  ) {
    throw new BadRequestError("You have reached your weekly ad limit");
  }

  const startStringToDate = new Date(startDate);
  const endDate = new Date(
    new Date(startDate).setDate(new Date(startDate).getDate() + 3)
  ); // new Date(Date(startStringToDate.getDate() + 3));
  const existingAds = await prisma.adCampaign.findFirst({
    where: {
      AND: [
        { storeId: req.user.id },
        { startDate: { gte: startStringToDate } },
        { endDate: { lte: endDate } },
      ],
    },
  });

  if (existingAds) {
    throw new BadRequestError("Ad already exists for this date range");
  }
  const [mainImageUrlsToStore, mainImagePublicIdsToStore] = await uploadImage({
    req: req,
    image: image,
  });

  // "store_home",
  //         "product_page",
  //         "collection",
  //         "sale_page",
  //         "gift_box",
  //         "featured_products",
  const targetTypeEnum =
    targetType == "store_home"
      ? TargetType.STORE_HOME
      : targetType == "product_page"
      ? TargetType.PRODUCT_PAGE
      : targetType == "collection"
      ? TargetType.COLLECTION
      : targetType == "sale_page"
      ? TargetType.SALE_PAGE
      : targetType == "gift_box"
      ? TargetType.GIFT_BOX
      : targetType == "featured_products"
      ? TargetType.FEATURED_PRODUCTS
      : undefined;
  const createdAd = await prisma.store.update({
    where: { id: req.user.id },
    data: {
      subscription: { update: { adsPerWeek: { increment: 1 } } },
      adCampaigns: {
        create: {
          title: {
            create: {
              default: name,
              en: nameEn || name,
              ar: nameAr || name,
            },
          },

          description: description,
          image: {
            create: {
              secureUrl: mainImageUrlsToStore,
              publicId: mainImagePublicIdsToStore,
            },
          }, // countryId: countryId,
          targetType: targetTypeEnum,
          product: { connect: { id: productId } },
          startDate: startStringToDate,
          endDate: endDate,
          // asfd: "Dadfwf",
        },
      },
    },
  });
  console.log(createdAd);

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: i18n.__("Ad created successfully"),
    // data: createdAd,
  });
};

const updateAd = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    nameEn,
    nameAr,
    description,
    startDate,
    targetType,
    productId,
  } = req.body;
  const image = req.files == undefined ? undefined : req.files.image;

  const zodModel = UpdateAdZodModel.safeParse({
    id: id,
    storeId: req.user.id,
    title: {
      default: name,
      en: nameEn,
      ar: nameAr,
    },
    description: description,
    image: image,
    startDate: startDate,
    targetType: targetType,
    productId: productId,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const startStringToDate =
    startDate != undefined ? new Date(startDate) : undefined;
  const endDate =
    startDate != undefined
      ? new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 3)) // new Date(Date(startStringToDate.getDate() + 3));
      : undefined;
  if (startDate) {
    const existingAds = await prisma.adCampaign.findFirst({
      where: {
        AND: [
          { storeId: req.user.id },
          { startDate: { gte: startStringToDate } },
          { endDate: { lte: endDate } },
        ],
      },
    });
    if (existingAds) {
      throw new BadRequestError("Ad already exists for this date range");
    }
    // const checkingStartDateAd = await prisma.adCampaign.findUnique({
    //   where: { id: id },
    // });
    // if (!checkingStartDateAd) {
    //   throw new BadRequestError("Ad does not exist");
    // }
    // if (checkingStartDateAd.startDate <= startStringToDate) {
    //   throw new BadRequestError("Ad can not be edited for this date range");
    // }
  }
  let imageUploadedSecureUrl = undefined;
  let imageUploadedPublicId = undefined;
  let ad = undefined;
  if (image) {
    ad = await prisma.adCampaign.findUnique({
      where: { id: id },
      include: {
        image: true,
      },
    });
    if (!ad) {
      throw new NotFoundError("Ad not found");
    }
    [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
      req: req,
      image: image,
    });
  }
  const targetTypeEnum =
    targetType == "store_home"
      ? TargetType.STORE_HOME
      : targetType == "product_page"
      ? TargetType.PRODUCT_PAGE
      : targetType == "collection"
      ? TargetType.COLLECTION
      : targetType == "sale_page"
      ? TargetType.SALE_PAGE
      : targetType == "gift_box"
      ? TargetType.GIFT_BOX
      : targetType == "featured_products"
      ? TargetType.FEATURED_PRODUCTS
      : undefined;
  const updatedAd = await prisma.adCampaign.update({
    where: { id: id },
    data: {
      title: {
        update: {
          default: name || undefined,
          en: nameEn || undefined,
          ar: nameAr || undefined,
        },
      },
      image: {
        // where: { occasionId: id },
        update: {
          secureUrl: imageUploadedSecureUrl || undefined,
          publicId: imageUploadedPublicId || undefined,
        },
      },
      description: description || undefined,
      targetType: targetTypeEnum || undefined,
      product: productId != undefined ? { connect: { id: productId } } : {},
      startDate: startStringToDate || undefined,
      endDate: endDate || undefined,
    },
    include: {
      image: true, // Include the image in the return object
    },
  });
  console.log(updatedAd);
  if (!updatedAd) {
    throw new NotFoundError("Ad not found");
  }
  if (image) {
    await destroyImage({ imagePublicId: ad.image.publicId });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Ad updated successfully"),
    data: updatedAd,
  });
};

const deleteAd = async (req, res, next) => {
  const { id: adId } = req.params;
  if (!adId) {
    throw new BadRequestError("Please enter an ad id");
  }
  const ad = await prisma.adCampaign.delete({
    where: { id: adId },
    include: { image: true },
  });
  if (!ad) {
    throw new BadRequestError("Ad not found");
  }
  await destroyImage({ imagePublicId: ad.image.publicId });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Ad deleted successfully" });
};

module.exports = {
  getAllUserAds,
  getAllStoreAds,
  getAd,
  createAd,
  updateAd,
  deleteAd,
};
