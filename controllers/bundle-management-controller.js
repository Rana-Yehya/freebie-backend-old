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
const { UpdateBundleZodModel } = require("../models/update-bundle-zod-model");
const { CreateBundleZodModel } = require("../models/create-bundle-zod-model");
const getAllStoreBundles = async (req, res, next) => {
  const bundles = await prisma.bundle.findMany({
    where: {
      bundleItems: {
        every: {
          productVariant: {
            productStock: { every: { branch: { storeId: req.user.id } } },
          },
        },
      },
    },
    include: { name: true, mainImage: true },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: bundles.length, data: bundles });
};

const createBundle = async (req, res, next) => {
  const {
    name,
    nameEn,
    nameAr,
    description,
    descriptionEn,
    descriptionAr,
    price,
    bundleItems,
  } = req.body;
  const mainImage = req.files == undefined ? undefined : req.files.mainImage;
  const bundleItemsList =
    bundleItems != undefined ? JSON.parse(bundleItems) : [];
  console.log(req.user.subscription.planLimit);
  if (req.user.subscription.planLimit.allowsBoxes != true) {
    throw new BadRequestError(
      "You can not create boxes on this subscription plan"
    );
  }
  const zodModel = CreateBundleZodModel.safeParse({
    name: {
      default: name,
      ar: nameAr,
      en: nameEn,
    },
    mainImage: mainImage,
    description: {
      default: description,
      en: descriptionAr,
      ar: descriptionEn,
    },
    price: price,
    bundleItems: bundleItemsList,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const [mainImageUrlsToStore, mainImagePublicIdsToStore] = await uploadImage({
    req: req,
    image: mainImage,
  });

  const bundleItemsListToStore = bundleItemsList.map((product) => {
    return {
      quantity: product.quantity,
      productVariant: {
        connect: {
          id: product.productVariantId,
        },
      },
    };
  });

  const createdBundle = await prisma.bundle.create({
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
      description: {
        create: {
          default: description,
          en: descriptionEn || description,
          ar: descriptionAr || description,
        },
      },
      bundlePrice: parseFloat(price),
      bundleItems: {
        create: bundleItemsListToStore.map((bundleItem) => bundleItem),
      },
    },
  });
  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: i18n.__("Bundle created successfully"),
    data: createdBundle,
  });
};
const updateBundle = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    nameEn,
    nameAr,
    description,
    descriptionEn,
    descriptionAr,
    price,
    bundleItems,
  } = req.body;
  const mainImage = req.files == undefined ? undefined : req.files.mainImage;
  const bundleItemsList =
    bundleItems != undefined ? JSON.parse(bundleItems) : [];
  console.log(req.user.subscription.planLimit);

  const zodModel = UpdateBundleZodModel.safeParse({
    id: id,
    name: {
      default: name,
      ar: nameAr,
      en: nameEn,
    },
    mainImage: mainImage,
    description: {
      default: description,
      en: descriptionAr,
      ar: descriptionEn,
    },
    price: price,
    bundleItems: bundleItemsList,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  let bundle;
  let mainImageUrlsToStore;
  let mainImagePublicIdsToStore;
  if (mainImage) {
    bundle = await prisma.bundle.findUnique({
      where: { id: id },
      select: { mainImage: true },
    });
    if (!bundle) {
      throw new NotFoundError("Bundle Not Found");
    }
    [mainImageUrlsToStore, mainImagePublicIdsToStore] = await uploadImage({
      req: req,
      image: mainImage,
    });
  }

  const updatedBundle = await prisma.bundle.update({
    where: { id: id },
    data: {
      name: {
        update: {
          default: name || undefined,
          en: nameEn || undefined,
          ar: nameAr || undefined,
        },
      },
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
      description: {
        update: {
          default: description || undefined,
          en: descriptionEn || undefined,
          ar: descriptionAr || undefined,
        },
      },
      bundlePrice: price == undefined ? undefined : parseFloat(price),
      //bundleItemsList.map((bundleIndex) => ({}))
      bundleItems: {
        upsert: bundleItemsList.map((bundleIndex) => ({
          where: {
            bundleId_productVariantId: {
              bundleId: id,
              productVariantId: bundleIndex.productVariantId,
            },
          },
          update: {
            quantity: bundleIndex.quantity || undefined,
            productVariant: {
              connect: {
                id: bundleIndex.productVariantId || undefined,
              },
            },
          },
          create: {
            productVariant: {
              connect: {
                id: bundleIndex.productVariantId,
              },
            },
          },
        })),
        // create: {
        //   quantity: bundleIndex.quantity || undefined,
        //   productVariant: {
        //     connect: {
        //       id: bundleIndex.productVariantId || undefined,
        //     },
        //   },
        // },
      },
    },
  });
  if (bundle && mainImage) {
    await destroyImage({
      imagePublicId: bundle.mainImage.publicId,
    });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Bundle updated successfully"),
    data: updatedBundle,
  });
};
const deleteBundle = async (req, res, next) => {
  const { id: bundleId } = req.params;
  if (!bundleId) {
    throw new BadRequestError("Please send a bundle id");
  }
  const bundle = await prisma.bundle.update({
    where: { id: bundleId },
    data: { status: ProductStatus.DELETED },
    // select: { image: true },
  });
  if (!bundle) {
    throw new NotFoundError("Product not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Bundle deleted successfully" });
};

module.exports = {
  getAllStoreBundles,
  createBundle,
  updateBundle,
  deleteBundle,
};
