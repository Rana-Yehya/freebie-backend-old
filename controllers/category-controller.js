const {
  CreateCategoryZodModel,
} = require("../models/create-category-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { uploadImage } = require("../helpers/cloudinary/upload-image");
const { destroyImage } = require("../helpers/cloudinary/delete-image");
const {
  UpdateCategoryZodModel,
} = require("../models/update-category-zod-model");
const getAllCategories = async (req, res, next) => {
  const category = await prisma.category.findMany({
    include: {
      image: true,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: category.length, data: category });
};
const getCategory = async (req, res, next) => {
  const { id: categoryId } = req.params;
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      image: true,
    },
  });
  if (!category) {
    throw new BadRequestError("Category not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: category });
};

const createCategory = async (req, res, next) => {
  const { name, canBeDeliveredOutsideState } = req.body;
  const image = req.files.image;

  const zodModel = CreateCategoryZodModel.safeParse({
    name: name,
    image: image,
    canBeDeliveredOutsideState: canBeDeliveredOutsideState,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
    image: image,
  });
  const createdCategory = await prisma.category.create({
    data: {
      name: name,
      canBeDeliveredOutsideState:
        canBeDeliveredOutsideState == undefined
          ? true
          : Boolean(canBeDeliveredOutsideState),
      image: {
        create: {
          secureUrl: imageUploadedSecureUrl,
          publicId: imageUploadedPublicId,
        },
      },
    },
  });
  console.log(createdCategory);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdCategory });
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, canBeDeliveredOutsideState } = req.body;
  const image = req.files == undefined ? undefined : req.files.image;
  const zodModel = UpdateCategoryZodModel.safeParse({
    name: name,
    image: image,
    canBeDeliveredOutsideState: canBeDeliveredOutsideState,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  let imageUploadedSecureUrl = undefined;
  let imageUploadedPublicId = undefined;
  let category = undefined;
  if (image) {
    category = await prisma.category.findUnique({
      where: { id: id },
      include: {
        image: true,
      },
    });
    if (!category) {
      throw new BadRequestError("Category not found");
    }
    [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
      image: image,
    });
  }
  const updatedCategory = await prisma.category.update({
    where: { id: id },
    data: {
      name: name || undefined,
      canBeDeliveredOutsideState:
        canBeDeliveredOutsideState == undefined
          ? undefined
          : Boolean(canBeDeliveredOutsideState),
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
    await destroyImage({ imagePublicId: category.image.publicId });
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: updatedCategory });
};

const deleteCategory = async (req, res, next) => {
  const { id: CategoryId } = req.params;
  const category = await prisma.category.delete({
    where: { id: CategoryId },
    include: {
      image: true,
    },
  });
  if (!category) {
    throw new BadRequestError("Category not found");
  }
  await destroyImage({ imagePublicId: category.image.publicId });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Category deleted successfully" });
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
