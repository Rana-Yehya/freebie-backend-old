const { ProductZodModel } = require("../models/product-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllProductsPerOccasions = async (req, res, next) => {
  const product = await prisma.product.findMany({
    where: {
      occasionsId: { in: req.query.occasionIds },
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
const getAllProductsPerCategories = async (req, res, next) => {
  const product = await prisma.product.findMany();
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
const getProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    throw new BadRequestError("Product not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: product });
};

const createProduct = async (req, res, next) => {
  const {
    name,
    image,
    description,
    detailedDescription,
    price,
    doesNeedPreparation,
    isAvailable,
    preparationTimeInMinutes,
    discountPrecent,
    discountStartTime,
    discountEndTime,
    color,
    stock,
    categoryId,
    productStock,
    occasionId,
    dimensionsWCm,
    dimensionsHCm,
    dimensionsLCm,
  } = req.body;
  console.log(productStock);
  const zodModel = ProductZodModel.safeParse({
    name: name,
    image: image,
    description: description,
    detailedDescription: detailedDescription,
    price: price,
    doesNeedPreparation: doesNeedPreparation,
    isAvailable: isAvailable,
    preparationTimeInMinutes: preparationTimeInMinutes,
    discountPrecent: discountPrecent,
    discountStartTime: discountStartTime,
    discountEndTime: discountEndTime,
    color: color,
    stock: stock,
    categoryId: categoryId,
    occasionId: occasionId,
    productStock: productStock,
    dimensionsWCm: dimensionsWCm,
    dimensionsHCm: dimensionsHCm,
    dimensionsLCm: dimensionsLCm,
  });

  if (!zodModel.success) {
    console.log(zodModel.error.errors[0]);

    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw new BadRequestError("Category not found");
  }
  if (occasionId) {
    for (var occasionIdElement in occasionId) {
      const occasion = await prisma.occasion.findUnique({
        where: { id: occasionIdElement },
      });
      if (!occasion) {
        throw new BadRequestError("Occasion not found");
      }
    }
  }

  for (
    let productStockIndex = 0;
    productStockIndex < productStock.length;
    productStockIndex++
  ) {
    const branch = await prisma.branch.findUnique({
      where: { id: productStock[productStockIndex].branchId },
    });
    if (!branch) {
      throw new BadRequestError("Branch not found");
    }
  }

  // categoryId
  // occasionId
  // branchId

  const createdProduct = await prisma.product.create({
    data: {
      name: name,
      image: image,
      description: description,
      detailedDescription: detailedDescription,
      price: price,
      doesNeedPreparation: doesNeedPreparation,
      isAvailable: isAvailable,
      preparationTimeInMinutes: preparationTimeInMinutes,
      discountPrecent: discountPrecent,
      discountStartTime: discountStartTime,
      discountEndTime: discountEndTime,
      color: color,
      categoryId: categoryId,
      occasionId: occasionId,
      // productStock: productStockDb,
      dimensionsWCm: dimensionsWCm,
      dimensionsHCm: dimensionsHCm,
      dimensionsLCm: dimensionsLCm,
    },
  });
  console.log(createdProduct);
  for (
    let productStockIndex = 0;
    productStockIndex < productStock.length;
    productStockIndex++
  ) {
    const productStockDb = await prisma.productStock.create({
      data: {
        branchId: productStock[productStockIndex].branchId,
        stock: productStock[productStockIndex].stock,
        productId: createdProduct.id,
      },
    });
  }

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, image } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  const updatedProduct = await prisma.product.update({
    where: { id: id },
    data: {
      name: name || undefined,
      image: image || undefined,
    },
  });
  console.log(updatedProduct);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: updatedProduct });
};

const deleteProduct = async (req, res, next) => {
  const { id: ProductId } = req.params;
  const product = await prisma.product.delete({
    where: { id: ProductId },
  });
  if (!product) {
    throw new BadRequestError("Product not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Product deleted successfully" });
};

module.exports = {
  getAllProductsPerOccasions,
  getAllProductsPerCategories,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
