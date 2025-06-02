const { CreateProductZodModel } = require("../models/create-product-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { UpdateProductZodModel } = require("../models/update-product-zod-model");
const { uploadMultipleImages } = require("../helpers/cloudinary/upload-image");

const createProduct = async (req, res, next) => {
  const {
    name,
    // image,
    description,
    detailedDescription,
    price,
    doesNeedPreparation,
    isAvailable,
    preparationTimeInMinutes,
    discountPrecent,
    discountStartTime,
    discountEndTime,
    categoryId,
    productStock,
    occasionId,
    dimensionsWCm,
    dimensionsHCm,
    dimensionsLCm,
  } = req.body;
  const image = req.files.images;
  console.log(productStock);
  const productStockJson = JSON.parse(productStock);
  const zodModel = CreateProductZodModel.safeParse({
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
    // color: color,
    categoryId: categoryId,
    occasionId: occasionId,
    productStock: productStockJson,
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
    productStockIndex < productStockJson.length;
    productStockIndex++
  ) {
    const branch = await prisma.branch.findUnique({
      where: { id: productStockJson[productStockIndex].branchId },
    });
    if (!branch) {
      throw new BadRequestError("Branch not found");
    }
  }
  let dateDiscountStartTime = null;
  let dateDiscountEndTime = null;

  if (discountStartTime) {
    const parseDiscountStartTime = Date.parse(discountStartTime);

    dateDiscountStartTime = new Date(parseDiscountStartTime);
  }
  if (discountEndTime) {
    const parseDiscountEndTime = Date.parse(discountEndTime);

    dateDiscountEndTime = new Date(parseDiscountEndTime);
  }
  const [imageUrlsToStore, imagePublicIdsToStore] = await uploadMultipleImages({
    images: image,
  });
  let imageToStore = [];
  for (let imageIndex = 0; imageIndex < imageUrlsToStore.length; imageIndex++) {
    imageToStore.push({
      secureUrl: imageUrlsToStore[imageIndex],
      publicId: imagePublicIdsToStore[imageIndex],
    });
  }
  const createdProduct = await prisma.product.create({
    data: {
      name: name,
      image: {
        createMany: { data: imageToStore },
      },
      description: description,
      detailedDescription: detailedDescription,
      price: parseInt(price),
      doesNeedPreparation: doesNeedPreparation,
      isAvailable: isAvailable,
      preparationTimeInMinutes: preparationTimeInMinutes,
      discountPrecent: discountPrecent,
      discountStartTime: dateDiscountStartTime,
      discountEndTime: dateDiscountEndTime,
      categoryId: categoryId,
      occasionId: occasionId,
      productStock: {
        createMany: {
          data: productStockJson,
        },
      },
      dimensionsWCm: parseInt(dimensionsWCm),
      dimensionsHCm: parseInt(dimensionsHCm),
      dimensionsLCm: parseInt(dimensionsLCm),
    },
    include: {
      productStock: true,
      image: true,
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
    isFeatured,
    isPopular,
    preparationTimeInMinutes,
    discountPrecent,
    discountStartTime,
    discountEndTime,
    categoryId,
    productStock,
    occasionId,
    dimensionsWCm,
    dimensionsHCm,
    dimensionsLCm,
  } = req.body;
  // console.log(productStock);
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
  // const productToUpdate = await prisma.product.findUnique({
  //   where: { id: id },
  // });

  // if (!productToUpdate) {
  //   throw new BadRequestError("Product not found");
  // }
  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestError("Category not found");
    }
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
  if (productStock) {
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
  }
  let dateDiscountStartTime = null;
  let dateDiscountEndTime = null;

  if (discountStartTime) {
    const parseDiscountStartTime = Date.parse(discountStartTime);

    dateDiscountStartTime = new Date(parseDiscountStartTime);
  }
  if (discountEndTime) {
    const parseDiscountEndTime = Date.parse(discountEndTime);

    dateDiscountEndTime = new Date(parseDiscountEndTime);
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
      isFeatured: isFeatured || undefined,
      isPopular: isPopular || undefined,
      preparationTimeInMinutes: preparationTimeInMinutes || undefined,
      discountPrecent: discountPrecent || undefined,
      discountStartTime: dateDiscountStartTime || undefined,
      discountEndTime: dateDiscountEndTime || undefined,
      categoryId: categoryId || undefined,
      occasionId: occasionId || undefined,
      // productStock: || undefined productStockDb,
      dimensionsWCm: dimensionsWCm || undefined,
      dimensionsHCm: dimensionsHCm || undefined,
      dimensionsLCm: dimensionsLCm || undefined,
    },
  });
  if (productStock) {
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
          productId_branchId_color: {
            productId: id,
            branchId: productStock[productStockIndex].branchId,
            color: productStock[productStockIndex].color,
          },
        },
        update: {
          // branchId: productStock[productStockIndex].branchId,
          stock: productStock[productStockIndex].stock || undefined,
          // color: productStock[productStockIndex].color || undefined,
          // color: productStock[productStockIndex].color,

          // productId: id,
        },
        create: {
          branchId: productStock[productStockIndex].branchId,
          stock: productStock[productStockIndex].stock,
          color: productStock[productStockIndex].color,
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
  createProduct,
  updateProduct,
  deleteProduct,
};
