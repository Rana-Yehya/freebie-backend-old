const { ProductZodModel } = require("../models/product-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UpdateProductZodModel } = require("../models/update-product-zod-model");
const getAllProductsPerOccasions = async (req, res, next) => {
  const occasionsIds = req.query.ids;
  if (occasionsIds == undefined || occasionsIds.length === 0) {
    throw new BadRequestError("Invalid occasions IDs");
  }
  const occasionsIdsList = JSON.parse(occasionsIds);
  const productIds = await prisma.productOccasion.findMany({
    where: {
      occasionsId: { in: occasionsIdsList },
    },
    select: {
      occasions: false,
      occasionsId: false,
      product: false,
      productId: true,
      createdAt: false,
      updatedAt: false,
    },
  });
  console.log(productIds);
  const product = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
const getAllProductsPerCategories = async (req, res, next) => {
  const categoryIds = req.query.ids;
  if (categoryIds == undefined || categoryIds.length === 0) {
    throw new BadRequestError("Invalid category IDs");
  }
  const categoryIdsList = JSON.parse(categoryIds);
  console.log(categoryIdsList);
  const product = await prisma.product.findMany({
    where: {
      categoryId: { in: categoryIdsList },
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
const getProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  const productStock = await prisma.productStock.findMany({
    where: { productId: productId },
  });
  if (!product) {
    throw new BadRequestError("Product not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: product, productStock });
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
      productStock: {
        createMany: {
          data: productStock,
        },
      },
      dimensionsWCm: dimensionsWCm,
      dimensionsHCm: dimensionsHCm,
      dimensionsLCm: dimensionsLCm,
    },
    include: {
      productStock: true,
    },
  });
  /*
  let productStockDb = [];
  for (
    let productStockIndex = 0;
    productStockIndex < productStock.length;
    productStockIndex++
  ) {
    productStockDb.push(
      await prisma.productStock.create({
        data: {
          branchId: productStock[productStockIndex].branchId,
          stock: productStock[productStockIndex].stock,
          productId: createdProduct.id,
        },
      })
    );
  }
  const updatedProduct = await prisma.product.update({
    where: { id: createdProduct.id },
    data: {
      productStock: productStockDb,
    },
  });
  console.log(updatedProduct);

  */
  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
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
    categoryId,
    productStock,
    occasionId,
    dimensionsWCm,
    dimensionsHCm,
    dimensionsLCm,
  } = req.body;
  console.log(productStock);
  const zodModel = UpdateProductZodModel.safeParse({
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
    productStock: productStock,
    dimensionsWCm: dimensionsWCm,
    dimensionsHCm: dimensionsHCm,
    dimensionsLCm: dimensionsLCm,
  });

  if (!zodModel.success) {
    console.log(zodModel.error.errors[0]);

    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const productToUpdate = await prisma.product.findUnique({
    where: { id: id },
  });
  if (!productToUpdate) {
    throw new BadRequestError("Product not found");
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
  const updatedProduct = await prisma.product.update({
    where: { id: id },
    data: {
      name: name || undefined,
      image: image || undefined,
      description: description || undefined,
      detailedDescription: detailedDescription || undefined,
      price: price || undefined,
      doesNeedPreparation: doesNeedPreparation || undefined,
      isAvailable: isAvailable || undefined,
      preparationTimeInMinutes: preparationTimeInMinutes || undefined,
      discountPrecent: discountPrecent || undefined,
      discountStartTime: discountStartTime || undefined,
      discountEndTime: discountEndTime || undefined,
      color: color || undefined,
      categoryId: categoryId || undefined,
      occasionId: occasionId || undefined,
      // productStock: || undefined productStockDb,
      dimensionsWCm: dimensionsWCm || undefined,
      dimensionsHCm: dimensionsHCm || undefined,
      dimensionsLCm: dimensionsLCm || undefined,
    },
  });

  for (
    let productStockIndex = 0;
    productStockIndex < productStock.length;
    productStockIndex++
  ) {
    // if (
    //   productStockToUpdate.map(
    //     (p) => p.branchId == productStockToUpdate[productStockIndex].branchId
    //   )
    // ) {
    await prisma.productStock.upsert({
      where: {
        productId_branchId: {
          productId: id,
          branchId: productStock[productStockIndex].branchId,
        },
      },
      update: {
        // branchId: productStock[productStockIndex].branchId,
        stock: productStock[productStockIndex].stock || undefined,
        // productId: id,
      },
      create: {
        branchId: productStock[productStockIndex].branchId,
        stock: productStock[productStockIndex].stock || undefined,
        productId: id,
      },
    });
    // } else {
    //   await prisma.productStock.create({
    //     data: {
    //       branchId: productStockToUpdate[productStockIndex].branchId,
    //       stock: productStockToUpdate[productStockIndex].stock,
    //       productId: id,
    //     },
    //   });
    // }
  }

  return res
    .status(StatusCodes.OK)
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
