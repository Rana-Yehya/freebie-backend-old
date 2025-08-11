const {
  CreateOccasionZodModel,
} = require("../models/create-occasion-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { uploadImage } = require("../helpers/image-kit/upload-image");
const { destroyImage } = require("../helpers/image-kit/delete-image");
const {
  UpdateOccasionZodModel,
} = require("../models/update-occasion-zod-model");
const getAllOccasions = async (req, res, next) => {
  const occasion = await prisma.occasion.findMany({
    include: { name: true, image: true },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: occasion.length, data: occasion });
};
const getOccasion = async (req, res, next) => {
  const { id: occasionId } = req.params;
  if (!occasionId) {
    throw new BadRequestError("Please enter an occasion id");
  }
  const occasion = await prisma.occasion.findUnique({
    where: { id: occasionId },
    include: { name: true, image: true },
  });
  if (!occasion) {
    throw new NotFoundError("Occasion not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: occasion });
};

const createOccasion = async (req, res, next) => {
  const { nameAr, nameEn, name } = req.body;
  const image = req.files != undefined ? req.files.image : undefined;

  const zodModel = CreateOccasionZodModel.safeParse({
    name: {
      default: name,
      ar: nameAr,
      en: nameEn,
    },
    image: image,
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
    req: req,
    image: image,
  });
  const createdOccasion = await prisma.occasion.create({
    data: {
      name: {
        create: {
          default: name,
          en: nameEn || name,
          ar: nameAr || name,
        },
      },
      image: {
        create: {
          secureUrl: imageUploadedSecureUrl,
          publicId: imageUploadedPublicId,
        },
      },
    },
    include: { name: true, image: true },
  });
  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Occasion Created Successfully",
    data: createdOccasion,
  });
};

const updateOccasion = async (req, res, next) => {
  const { id } = req.params;
  const { nameAr, nameEn, name } = req.body;
  const image = req.files != undefined ? req.files.image : undefined;

  const zodModel = UpdateOccasionZodModel.safeParse({
    id: id,
    name: {
      default: name,
      ar: nameAr,
      en: nameEn,
    },
    image: image,
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  let imageUploadedSecureUrl = undefined;
  let imageUploadedPublicId = undefined;
  let occasion = undefined;
  if (image) {
    occasion = await prisma.occasion.findUnique({
      where: { id: id },
      include: {
        image: true,
      },
    });
    if (!occasion) {
      throw new NotFoundError("Occasion not found");
    }
    [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
      req: req,
      image: image,
    });
  }

  const updatedOccasion = await prisma.occasion.update({
    where: { id: id },
    data: {
      name: {
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
    },
    include: { name: true, image: true },
  });
  if (image) {
    await destroyImage({ imagePublicId: occasion.image.publicId });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Occasion updated successfully",
    data: updatedOccasion,
  });
};

const deleteOccasion = async (req, res, next) => {
  const { id: occasionId } = req.params;
  if (!occasionId) {
    throw new BadRequestError("Please enter an occasion id");
  }
  const occasion = await prisma.occasion.delete({
    where: { id: occasionId },
    include: {
      image: true,
    },
  });
  if (!occasion) {
    throw new NotFoundError("Occasion not found");
  }
  await destroyImage({ imagePublicId: occasion.image.publicId });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Occasion deleted successfully" });
};

module.exports = {
  getAllOccasions,
  getOccasion,
  createOccasion,
  updateOccasion,
  deleteOccasion,
};
