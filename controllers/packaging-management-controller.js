const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { uploadImage } = require("../helpers/image-kit/upload-image");
const { destroyImage } = require("../helpers/image-kit/delete-image");
const { CreatePackageZodModel } = require("../models/create-package-zod-model");
const { PackageType } = require("../generated/prisma");
const { UpdatePackageZodModel } = require("../models/update-package-zod-model");
const {
  CreatePackagingVariationZodModel,
} = require("../models/create-packaging-variation-zod-model");

const getAllPackages = async (req, res, next) => {
  const packaging = await prisma.packaging.findMany({
    include: {
      image: true,
      name: true,
      packagingVariation: true,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: packaging.length, data: packaging });
};

const createPackaging = async (req, res, next) => {
  const {
    name,
    nameAr,
    nameEn,
    price,
    packageType,
    packagingVariation,
    dimensionsWCm,
    dimensionsHCm,
    dimensionsLCm,
  } = req.body;
  const image = req.files != undefined ? req.files.image : undefined;
  const packagingVariationList =
    packagingVariation != undefined ? JSON.parse(packagingVariation) : [];
  // const colorList = req.body.colors
  //   ? decodeURIComponent(req.body.colors)
  //       .replace(/[\[\] ]/g, "")
  //       .split(",")
  //   : undefined;
  const zodModel = CreatePackageZodModel.safeParse({
    name: {
      default: name,
      ar: nameAr,
      en: nameEn,
    },
    image: image,
    price: price,
    packagingVariation: packagingVariationList,
    // colors: colorList,
    packageType: packageType,
    dimensionsWCm: dimensionsWCm,
    dimensionsHCm: dimensionsHCm,
    dimensionsLCm: dimensionsLCm,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
    req: req,
    image: image,
  });
  const packageTypeEnum =
    packageType === "giftbox"
      ? PackageType.GIFT_BOX
      : packageType === "giftbag"
      ? PackageType.GIFT_BAG
      : packageType === "wrapping"
      ? PackageType.WRAPPING
      : undefined;
  const packagingVariationListToStore = packagingVariationList.map(
    (package) => {
      return {
        color: package.color,
        // productStock: {
        //   create: {
        //     branch: { connect: { id: product.branchId } },
        //     stock: product.stock,
        //   },
        // },
      };
    }
  );
  const createdPackaging = await prisma.packaging.create({
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
      price: parseFloat(price),
      packageType: packageTypeEnum,
      packagingVariation: {
        create: packagingVariationListToStore.map((package) => package),
      },
      // colors: colorList,
      dimensionsWCm: parseFloat(dimensionsWCm),
      dimensionsHCm: parseFloat(dimensionsHCm),
      dimensionsLCm: parseFloat(dimensionsLCm),
    },
    include: {
      name: true,
      image: true,
    },
  });
  console.log(createdPackaging);

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: i18n.__("Packaging created successfully"),
    data: createdPackaging,
  });
};

const createPackageVariant = async (req, res, next) => {
  const { id: packageId } = req.params;
  const { color } = req.body;
  if (!packageId) {
    throw new BadRequestError("Please enter a package id");
  }
  const zodModel = CreatePackagingVariationZodModel.safeParse({
    // packageId: packageId,
    color: color,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const packaging = await prisma.packaging.update({
    where: {
      id: packageId,
    },
    data: {
      packagingVariation: {
        create: {
          //branch: { connect: { id: branchId } },
          color: color,
        },
      },
    },
  });

  if (!packaging) {
    throw new NotFoundError("Package not found");
  }

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Packaging Variant created successfully",
    data: packaging,
  });
};

const deletePackageVariant = async (req, res, next) => {
  const { id: packageVariantId } = req.params;

  const package = await prisma.packagingVariation.delete({
    where: {
      id: packageVariantId,
    },
  });
  if (!package) {
    throw new NotFoundError("Package not found");
  }

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Package Variation deleted successfully",
  });
};
const updatePackaging = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    nameAr,
    nameEn,
    price,
    packageType,
    packagingVariation,
    dimensionsWCm,
    dimensionsHCm,
    dimensionsLCm,
  } = req.body;
  const image = req.files == undefined ? undefined : req.files.image;
  const packagingVariationList =
    packagingVariation != undefined ? JSON.parse(packagingVariation) : [];
  const zodModel = UpdatePackageZodModel.safeParse({
    id: id,
    name: {
      default: name,
      ar: nameAr,
      en: nameEn,
    },
    image: image,
    price: price,
    packagingVariation: packagingVariationList,
    packageType: packageType,
    dimensionsWCm: dimensionsWCm,
    dimensionsHCm: dimensionsHCm,
    dimensionsLCm: dimensionsLCm,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const packageTypeEnum =
    packageType === "giftbox"
      ? PackageType.GIFT_BOX
      : packageType === "giftbag"
      ? PackageType.GIFT_BAG
      : packageType === "wrapping"
      ? PackageType.WRAPPING
      : undefined;

  let packaging = undefined;
  let imageUploadedSecureUrl = undefined;
  let imageUploadedPublicId = undefined;

  if (image) {
    packaging = await prisma.packaging.findUnique({
      where: { id: id },
      include: {
        image: true,
      },
    });
    if (!packaging) {
      throw new NotFoundError("Packaging not found");
    }
    [imageUploadedSecureUrl, imageUploadedPublicId] = await uploadImage({
      req: req,
      image: image,
    });
  }
  console.log(imageUploadedSecureUrl);
  console.log(imageUploadedPublicId);
  const updatedPackaging = await prisma.packaging.update({
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
      price: price != undefined ? parseFloat(price) : undefined,
      packageType: packageTypeEnum || undefined,
      ...(packagingVariationList == []
        ? {}
        : {
            packagingVariation: {
              //packagingVariationList.map((package) => (
              update: packagingVariationList.map((package) => ({
                where: {
                  id: package.packageVariantId,
                },

                data: {
                  color: package.color || undefined,
                },
              })),
            },
          }),
      dimensionsWCm:
        dimensionsWCm != undefined ? parseFloat(dimensionsWCm) : undefined,
      dimensionsHCm:
        dimensionsHCm != undefined ? parseFloat(dimensionsHCm) : undefined,
      dimensionsLCm:
        dimensionsLCm != undefined ? parseFloat(dimensionsLCm) : undefined,
    },
    include: {
      name: true,
      image: true, // Include the image in the return object
    },
  });

  if (image) {
    await destroyImage({ imagePublicId: packaging.image.publicId });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Packaging updated successfully"),
    data: updatedPackaging,
  });
};

const deletePackaging = async (req, res, next) => {
  const { id: packagingId } = req.params;
  if (!packagingId) {
    throw new BadRequestError("Please enter a packaging id");
  }
  const packaging = await prisma.packaging.delete({
    where: { id: packagingId },
    include: {
      image: true,
    },
  });
  if (!packaging) {
    throw new NotFoundError("Packaging not found");
  }
  await destroyImage({ imagePublicId: packaging.image.publicId });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Packaging deleted successfully" });
};

module.exports = {
  getAllPackages,
  createPackaging,
  deletePackaging,
  updatePackaging,
  createPackageVariant,
  deletePackageVariant,
};
