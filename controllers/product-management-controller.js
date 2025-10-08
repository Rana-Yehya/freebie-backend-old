const { CreateProductZodModel } = require("../models/create-product-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { UpdateProductZodModel } = require("../models/update-product-zod-model");
const i18n = require("i18n");

const {
  uploadMultipleImages,
  uploadImage,
} = require("../helpers/image-kit/upload-image");
const {
  destroyMultipleImages,
  destroyImage,
} = require("../helpers/image-kit/delete-image");
const { ProductTags, ProductStatus } = require("../generated/prisma");
const { default: z } = require("zod");
const {
  addJob,
  addProductDiscountQueue,
  removeProductDiscountQueue,
} = require("../helpers/cron/add-job-to-bullmq");
const getAllStoreProducts = async (req, res, next) => {
  const products = await prisma.product.findMany({
    where: {
      productVariant: {
        every: {
          productStock: { every: { branch: { storeId: req.user.id } } },
        },
      },
    },
    include: { occasions: true },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: products.length, data: products });
};
const createProduct = async (req, res, next) => {
  const {
    name,
    nameEn,
    nameAr,
    // image,
    description,
    descriptionEn,
    descriptionAr,
    detailedDescription,
    detailedDescriptionEn,
    detailedDescriptionAr,
    price,
    doesNeedPreparation,
    canBeDeliveredOutsideState,
    isAvailable,
    preparationTimeInMinutes,
    discountPercent,
    discountStartTime,
    discountEndTime,
    categoryId,
    productStock,
    occasions,
    dimensionsWCm,
    dimensionsHCm,
    dimensionsLCm,
    weightInKg,
  } = req.body;
  // const image = req.files.images;
  // const mainImage = req.files.mainImage;
  const image = req.files == undefined ? undefined : req.files.images;
  const mainImage = req.files == undefined ? undefined : req.files.mainImage;

  // console.log(productStock);
  const productStockList =
    productStock != undefined ? JSON.parse(productStock) : [];
  const occasionsList =
    occasions != undefined ? JSON.parse(occasions) : undefined;

  const zodModel = CreateProductZodModel.safeParse({
    name: {
      default: name,
      ar: nameAr,
      en: nameEn,
    },
    mainImage: mainImage,
    image: image,
    description: {
      default: description,
      en: descriptionAr,
      ar: descriptionEn,
    },
    detailedDescription: {
      default: detailedDescription,
      en: detailedDescriptionAr,
      ar: detailedDescriptionEn,
    },
    price: price,
    doesNeedPreparation: doesNeedPreparation,
    canBeDeliveredOutsideState: canBeDeliveredOutsideState,
    isAvailable: isAvailable,
    preparationTimeInMinutes: preparationTimeInMinutes,
    discountPercent: discountPercent,
    discountStartTime: discountStartTime,
    discountEndTime: discountEndTime,
    // color: color,
    categoryId: categoryId,
    occasions: occasionsList,
    productStock: productStockList,
    dimensionsWCm: dimensionsWCm,
    dimensionsHCm: dimensionsHCm,
    dimensionsLCm: dimensionsLCm,
    weightInKg: weightInKg,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  if (
    req.user.subscription.maxTotalProducts >=
    req.user.subscription.planLimit.maxProducts
  ) {
    throw new BadRequestError(
      "You have reached the maximum number of products"
    );
  }
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw new NotFoundError("Category not found");
  }
  // if (occasions) {
  //   const occasionCount = await prisma.occasion.count({
  //     where: { id: { in: occasionsList } },
  //     select: { id: true },
  //   });
  //   if (occasionsList.length != occasionCount.length) {
  //     throw new BadRequestError("Some occasions are not found");
  //   }
  // }

  // if (productStockList.length !== 0) {
  //   const productStockBranchIds = productStockList.map(
  //     (product) => product.branchId
  //   );
  //   const branchCount = await prisma.branch.count({
  //     where: { id: { in: productStockBranchIds } },
  //   });
  //   if (!branch) {
  //     throw new BadRequestError("Branch not found");
  //   }
  // }
  let dateDiscountStartTime = null;
  let dateDiscountEndTime = null;

  if (discountStartTime) {
    dateDiscountStartTime = new Date(discountStartTime);
  }
  if (discountEndTime) {
    dateDiscountEndTime = new Date(discountEndTime);
  }
  const [imageUrlsToStore, imagePublicIdsToStore] = await uploadMultipleImages({
    req: req,
    images: image,
  });
  const [mainImageUrlsToStore, mainImagePublicIdsToStore] = await uploadImage({
    req: req,
    image: mainImage,
  });
  let imageToStore = [];
  for (let imageIndex = 0; imageIndex < imageUrlsToStore.length; imageIndex++) {
    imageToStore.push({
      secureUrl: imageUrlsToStore[imageIndex],
      publicId: imagePublicIdsToStore[imageIndex],
    });
  }

  const productStockListToStore = productStockList.map((product) => {
    return {
      color: product.color,
      productStock: {
        create: {
          branch: { connect: { id: product.branchId } },
          stock: product.stock,
        },
      },
    };
  });
  const createdProduct = await prisma.product.create({
    data: {
      name: {
        create: {
          default: name,
          en: nameEn || name,
          ar: nameAr || name,
        },
      },
      mainImage: {
        create: {
          secureUrl: mainImageUrlsToStore,
          publicId: mainImagePublicIdsToStore,
        },
      },
      image: {
        createMany: { data: imageToStore },
      },
      description: {
        create: {
          default: description,
          en: descriptionEn || description,
          ar: descriptionAr || description,
        },
      },
      detailedDescription: {
        create: {
          default: detailedDescription,
          en: detailedDescriptionEn || detailedDescription,
          ar: detailedDescriptionAr || detailedDescription,
        },
      },
      tags: ProductTags.NONE,
      price: parseFloat(price),
      discount:
        discountStartTime && discountEndTime && discountPercent
          ? {
              create: {
                // actualPrice:
                //   parseFloat(price) -
                //   (parseFloat(price) * parseFloat(discountPercent) * 100) / 100,
                discountPercent: parseFloat(discountPercent),
                discountStartTime: dateDiscountStartTime,
                discountEndTime: dateDiscountEndTime,
              },
            }
          : undefined,
      canBeDeliveredOutsideState:
        category.canBeDeliveredOutsideState == true
          ? canBeDeliveredOutsideState == undefined
            ? undefined
            : canBeDeliveredOutsideState === "false"
            ? false
            : true
          : false,
      // actualPrice:
      //   discountPercent == undefined || discountPercent == 0
      //     ? parseFloat(price)
      //     : parseFloat(price) -
      //       (parseFloat(price) * parseFloat(discountPercent)) / 100,
      doesNeedPreparation: Boolean(doesNeedPreparation), // === "false" ? false : true,
      preparationTimeInMinutes: preparationTimeInMinutes,
      category: { connect: { id: categoryId } },
      occasions:
        occasionsList == undefined
          ? undefined
          : {
              connect: occasionsList.map((id) => ({ id })),
            },
      productVariant: {
        create: productStockListToStore.map((productStock) => productStock),
      },
      dimensionsWCm: parseFloat(dimensionsWCm),
      dimensionsHCm: parseFloat(dimensionsHCm),
      dimensionsLCm: parseFloat(dimensionsLCm),
      weightInKg: parseFloat(weightInKg),
    },
    include: {
      image: true,
      occasions: true,
    },
  });
  if (createdProduct) {
    await prisma.store.update({
      where: { id: req.user.id },
      data: {
        subscription: {
          update: {
            maxTotalProducts: { increment: 1 },
          },
        },
      },
    });
  }
  if (dateDiscountEndTime != undefined) {
    removeProductDiscountQueue({
      productId: updatedProduct.id,
      delay: dateDiscountEndTime,
    });
  }
  if (dateDiscountStartTime != undefined) {
    addProductDiscountQueue({
      productId: updatedProduct.id,
      delay: dateDiscountStartTime,
    });
  }
  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: i18n.__("Product created successfully"),
    data: createdProduct,
  });
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    nameEn,
    nameAr,
    // image,
    description,
    descriptionEn,
    descriptionAr,
    detailedDescription,
    detailedDescriptionEn,
    detailedDescriptionAr,
    price,
    doesNeedPreparation,
    isAvailable,
    preparationTimeInMinutes,
    discountPercent,
    canBeDeliveredOutsideState,
    discountStartTime,
    discountEndTime,
    categoryId,
    productStock,
    occasions,
    dimensionsWCm,
    dimensionsHCm,
    dimensionsLCm,
    weightInKg,
  } = req.body;
  const image = req.files == undefined ? undefined : req.files.images;
  const mainImage = req.files == undefined ? undefined : req.files.mainImage;
  const productStockList =
    productStock == undefined ? [] : JSON.parse(productStock);
  const occasionsList = occasions == undefined ? [] : JSON.parse(occasions);
  const zodModel = UpdateProductZodModel.safeParse({
    id: id,
    name: {
      default: name,
      ar: nameAr,
      en: nameEn,
    },
    mainImage: mainImage,
    image: image,
    description: {
      default: description,
      en: descriptionAr,
      ar: descriptionEn,
    },
    detailedDescription: {
      default: detailedDescription,
      en: detailedDescriptionAr,
      ar: detailedDescriptionEn,
    },
    price: price,
    doesNeedPreparation: doesNeedPreparation,
    isAvailable: isAvailable,
    preparationTimeInMinutes: preparationTimeInMinutes,
    canBeDeliveredOutsideState: canBeDeliveredOutsideState,
    discountPercent: discountPercent,
    discountStartTime: discountStartTime,
    discountEndTime: discountEndTime,
    categoryId: categoryId,
    occasions: occasionsList,
    productStock: productStockList,
    dimensionsWCm: dimensionsWCm,
    dimensionsHCm: dimensionsHCm,
    dimensionsLCm: dimensionsLCm,
    weightInKg: weightInKg,
  });
  console.log(zodModel.error);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  let dateDiscountStartTime = null;
  let dateDiscountEndTime = null;
  // const offsetInMinutes = new Date().getTimezoneOffset();

  // const localDate = new Date();
  // const utcDate = new Date(localDate.getTime() - offsetInMinutes * 60000);
  if (discountStartTime) {
    // const parseDiscountStartTime = Date.parse(discountStartTime);
    dateDiscountStartTime = new Date(discountStartTime);
  }
  if (discountEndTime) {
    // const parseDiscountEndTime = Date.parse(discountEndTime);
    dateDiscountEndTime = new Date(discountEndTime);
  }
  const product = await prisma.product.findUnique({
    where: { id: id },
    select: {
      id: true,
      // price: true,
      mainImage: true,
      image: true,
      category: true,
      // productVariant: true,
    },
  });
  if (!product) {
    throw new BadRequestError("Product not found");
  }
  let imageToStore = [];
  let mainImageUrlsToStore;
  let mainImagePublicIdsToStore;
  if (mainImage) {
    [mainImageUrlsToStore, mainImagePublicIdsToStore] = await uploadImage({
      req: req,
      image: mainImage,
    });
  }
  if (image) {
    const [imageUrlsToStore, imagePublicIdsToStore] =
      await uploadMultipleImages({
        req: req,
        images: image,
      });
    for (
      let imageIndex = 0;
      imageIndex < imageUrlsToStore.length;
      imageIndex++
    ) {
      imageToStore.push({
        secureUrl: imageUrlsToStore[imageIndex],
        publicId: imagePublicIdsToStore[imageIndex],
      });
    }
  }
  const updatedProduct = await prisma.product.update({
    where: { id: id },
    data: {
      mainImage: {
        update:
          mainImageUrlsToStore != undefined &&
          mainImagePublicIdsToStore != undefined
            ? {
                secureUrl: mainImageUrlsToStore,
                publicId: mainImagePublicIdsToStore,
              }
            : undefined,
      },
      // [mainImageUrlsToStore, mainImagePublicIdsToStore]
      image: {
        createMany: image == undefined ? undefined : { data: imageToStore },
      },
      price: price == undefined ? undefined : parseFloat(price),
      discount:
        discountStartTime || discountEndTime || discountPercent
          ? {
              connectOrCreate: {
                where: {
                  productId: id,
                },
                create: {
                  // actualPrice:
                  //   parseFloat(price || product.price) -
                  //     (parseFloat(price || product.price) *
                  //       parseFloat(discountPercent || product.discountPercent) *
                  //       100) /
                  //       100 || undefined,
                  discountPercent: parseFloat(discountPercent) || undefined,
                  discountStartTime: dateDiscountStartTime || undefined,
                  discountEndTime: dateDiscountEndTime || undefined,
                },
              },
              update: {
                // actualPrice:
                //   parseFloat(price || product.price) -
                //     (parseFloat(price || product.price) *
                //       parseFloat(discountPercent || product.discountPercent) *
                //       100) /
                //       100 || undefined,
                discountPercent: parseFloat(discountPercent) || undefined,
                discountStartTime: dateDiscountStartTime || undefined,
                discountEndTime: dateDiscountEndTime || undefined,
              },
            }
          : undefined,
      name: {
        update: {
          default: name || undefined,
          en: nameEn || undefined,
          ar: nameAr || undefined,
        },
      },
      description: {
        update: {
          default: description || undefined,
          en: descriptionEn || undefined,
          ar: descriptionAr || undefined,
        },
      },
      detailedDescription: {
        update: {
          default: detailedDescription || undefined,
          en: detailedDescriptionEn || undefined,
          ar: detailedDescriptionAr || undefined,
        },
      },
      doesNeedPreparation:
        doesNeedPreparation == undefined
          ? undefined
          : doesNeedPreparation === "false"
          ? false
          : true,
      canBeDeliveredOutsideState:
        canBeDeliveredOutsideState == undefined
          ? undefined
          : product.category.canBeDeliveredOutsideState == true
          ? canBeDeliveredOutsideState === "false"
            ? false
            : true
          : false,
      tags: undefined,
      preparationTimeInMinutes: preparationTimeInMinutes || undefined,
      // discountPercent:
      //   discountPercent == undefined ? undefined : parseFloat(discountPercent),
      // discountStartTime: dateDiscountStartTime || undefined,
      // discountEndTime: dateDiscountEndTime || undefined,
      category: categoryId != undefined ? { connect: { id: categoryId } } : {},
      //{ connect: { id: categoryId || undefined } },
      occasions:
        occasionsList.length == 0
          ? undefined
          : {
              connect: occasionsList.map((id) => ({ id })),
            }, // productStock: || undefined productStockDb,
      dimensionsWCm:
        dimensionsWCm == undefined ? undefined : parseFloat(dimensionsWCm),
      dimensionsHCm:
        dimensionsHCm == undefined ? undefined : parseFloat(dimensionsHCm),
      dimensionsLCm:
        dimensionsLCm == undefined ? undefined : parseFloat(dimensionsLCm),
      weightInKg: weightInKg == undefined ? undefined : parseFloat(weightInKg),

      productVariant: {
        // productStockList.map((productIndex) => ({
        // productStockList.map((productIndex) => (
        upsert: productStockList.map((productIndex) => ({
          where: {
            productId_color: {
              productId: id,
              color: productIndex.color,
            },
          },
          update: {
            productStock: {
              upsert: {
                where: {
                  // id_branchId: {
                  branchId: productIndex.branchId || "",
                  id: productIndex.productStockId || "",
                  // },
                },
                update: {
                  stock: productIndex.stock || undefined,
                },
                create: {
                  branch: { connect: { id: productIndex.branchId } }, // branchId: productIndex.branchId || undefined,
                  stock: productIndex.stock || undefined,
                },
              },
            },
          },
          create: {
            color: productIndex.color,
            // product: { connect: { id: id } },
            // productId: id,
            productStock: {
              create: {
                branch: { connect: { id: productIndex.branchId } },
                // branchId: productIndex.branchId || undefined,
                stock: productIndex.stock || undefined,
              },
            },
          },
        })),
      },
      // isFeatured: isFeatured || undefined,
      // isPopular: isPopular || undefined,
    },
    include: {
      productVariant: { include: { productStock: true } },
      occasions: true,
      image: true,
      discount: true,
    },
  });
  if (product && mainImage) {
    await destroyImage({
      imagePublicId: product.mainImage.publicId,
    });
  }
  if (dateDiscountEndTime != undefined) {
    removeProductDiscountQueue({
      productId: updatedProduct.id,
      delay: dateDiscountEndTime,
    });
  }
  if (dateDiscountStartTime != undefined) {
    addProductDiscountQueue({
      productId: updatedProduct.id,
      delay: dateDiscountStartTime,
    });
  }
  // if (image) {
  //   await destroyMultipleImages({
  //     imagePublicId: product.image.map((image) => image.publicId),
  //   });
  // }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Product updated successfully"),
    data: updatedProduct,
  });
};

const deleteProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  if (!productId) {
    throw new BadRequestError("Please send a product id");
  }
  const order = await prisma.order.findFirst({
    where: {
      productOrder: {
        every: {
          AND: [
            { productStock: { variant: { productId: productId } } },
            {
              status: { notIn: [OrderStatus.DELIVERED, OrderStatus.CANCELLED] },
            },
          ],
        },
      },
    },
  });
  if (order) {
    throw new BadRequestError(
      "User can not be deleted. This user has unfinished orders"
    );
  }

  const product = await prisma.product.delete({
    where: { id: productId },
    // data: { status: ProductStatus.DELETED },
    // select: { image: true },
  });
  if (!product) {
    throw new NotFoundError("Product not found");
  } else {
    await prisma.store.update({
      where: { id: req.user.id },
      data: {
        subscription: {
          update: { maxTotalProducts: { decrement: 1 } },
        },
      },
    });
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Product deleted successfully" });
};

const deleteProductImage = async (req, res, next) => {
  const { id: ProductId } = req.params;
  const { images } = req.body;
  // const imagesList = images == undefined ? [] : JSON.parse(images);
  const imagesList = images;
  console.log(images);

  const product = await prisma.product.findUnique({
    where: {
      id: ProductId,
      // image: { every: { id: { in: imagesList } } },
    },
    select: { image: true },
  });

  if (!product) {
    throw new BadRequestError("Product not found");
  }
  // const productImageIds = product.image.map((image) => image.id);

  let productImages = [];
  imagesList.forEach((item) =>
    productImages.push(product.image.find((image) => image.id === item))
  );
  console.log(productImages);

  if (imagesList.length != productImages.length) {
    throw new BadRequestError("Product images are not found");
  }

  const productImagePublicIds = productImages.map((image) => image.publicId);
  const productImageIds = productImages.map((image) => image.id);

  await prisma.image.deleteMany({
    where: {
      id: { in: productImageIds },
    },
  });
  await destroyMultipleImages({
    imagesPublicIds: productImagePublicIds,
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Product images deleted successfully" });
};

module.exports = {
  getAllStoreProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage,
};
