const { OccasionZodModel } = require("../models/occasion-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { uploadImage } = require("../helpers/cloudinary/upload-image");
const { destroyImage } = require("../helpers/cloudinary/delete-image");
const getAllOccasions = async (req, res, next) => {
  const occasion = await prisma.occasion.findMany({ include: { image: true } });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: occasion.length, data: occasion });
};
const getOccasion = async (req, res, next) => {
  const { id: occasionId } = req.params;
  const occasion = await prisma.occasion.findUnique({
    where: { id: occasionId },
    include: { image: true },
  });
  if (!occasion) {
    throw new BadRequestError("Occasion not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: occasion });
};

const createOccasion = async (req, res, next) => {
  const { name } = req.body;
  const image = req.files.image;

  const zodModel = OccasionZodModel.safeParse({
    name: name,
    image: image,
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
    image: image,
  });
  const createdOccasion = await prisma.occasion.create({
    data: {
      name: name,
      image: {
        create: {
          secureUrl: imageUploadedSecureUrl,
          publicId: imageUploadedPublicId,
        },
      },
    },
  });
  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdOccasion });
};

const updateOccasion = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.files == undefined ? undefined : req.files.image;
  if (!id) {
    throw new BadRequestError("Please send an ID");
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
      throw new BadRequestError("Occasion not found");
    }
    [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
      image: image,
    });
  }

  const updatedOccasion = await prisma.occasion.update({
    where: { id: id },
    data: {
      name: name || undefined,
      image: {
        // where: { occasionId: id },
        update: {
          secureUrl: imageUploadedSecureUrl || undefined,
          publicId: imageUploadedPublicId || undefined,
        },
      },
    },
    include: {
      image: true, // Include the image in the return object
    },
  });
  if (image) {
    await destroyImage({ imagePublicId: occasion.image.publicId });
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: updatedOccasion });
};

const deleteOccasionImage = async (req, res, next) => {
  const { id } = req.params;
  // const { name } = req.body;
  // const image = req.files == undefined ? undefined : req.files.image;
  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  // let imageUploadedSecureUrl = undefined;
  // let imageUploadedPublicId = undefined;
  // if (image) {
  //   [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
  //     image: image,
  //   });
  // }

  await prisma.image.delete({
    where: { id: id },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Image deleted successfully" });
};

const deleteOccasion = async (req, res, next) => {
  const { id: occasionId } = req.params;
  const occasion = await prisma.occasion.delete({
    where: { id: occasionId },
    include: {
      image: true,
    },
  });
  if (!occasion) {
    throw new BadRequestError("Occasion not found");
  }
  await destroyImage({ imagePublicId: occasion.image.publicId });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Occasion deleted successfully" });
};

module.exports = {
  getAllOccasions,
  getOccasion,
  deleteOccasionImage,
  createOccasion,
  updateOccasion,
  deleteOccasion,
};
