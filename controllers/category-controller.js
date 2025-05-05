const { CategoryZodModel } = require("../models/category-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllCategories = async (req, res, next) => {
  const category = await prisma.category.findMany();
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: category.length, data: category });
};
const getCategory = async (req, res, next) => {
  const { id: categoryId } = req.params;
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw new BadRequestError("Category not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: category });
};

const createCategory = async (req, res, next) => {
  const { name, image } = req.body;
  const zodModel = CategoryZodModel.safeParse({
    name: name,
    image: image,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const createdCategory = await prisma.category.create({
    data: {
      name: name,
      image: image,
    },
  });
  console.log(createdCategory);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdCategory });
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, image } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  const updatedCategory = await prisma.category.update({
    where: { id: id },
    data: {
      name: name || undefined,
      image: image || undefined,
    },
  });
  console.log(updatedCategory);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: updatedCategory });
};

const deleteCategory = async (req, res, next) => {
  const { id: CategoryId } = req.params;
  const category = await prisma.category.delete({
    where: { id: CategoryId },
  });
  if (!category) {
    throw new BadRequestError("Category not found");
  }
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
