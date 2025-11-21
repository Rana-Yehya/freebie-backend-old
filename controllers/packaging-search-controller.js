const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const { PackageType } = require("../generated/prisma");

const searchPackages = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const { priceSmall, priceHigh, height, width, packageType } = req.query;
  const colorList = req.query.colors
    ? decodeURIComponent(req.query.colors)
        .replace(/[\[\] ]/g, "")
        .split(",")
    : undefined;
  let widthFloat = undefined;
  if (width && parseFloat(width) !== NaN) {
    widthFloat = parseFloat(width);
  }
  let heightFloat = undefined;
  if (height && parseFloat(height) !== NaN) {
    heightFloat = parseFloat(height);
  }

  let priceSmallFloat = undefined;
  if (priceSmall && parseFloat(priceSmall) !== NaN) {
    priceSmallFloat = parseFloat(priceSmall);
  }
  let priceHighFloat = undefined;
  if (priceHigh && parseFloat(priceHigh) !== NaN) {
    priceHighFloat = parseFloat(priceHigh);
  }
  const packageTypeEnum =
    packageType === "giftbox"
      ? PackageType.GIFT_BOX
      : packageType === "giftbag"
      ? PackageType.GIFT_BAG
      : packageType === "wrapping"
      ? PackageType.WRAPPING
      : undefined;

  const packaging = await prisma.packaging.findMany({
    where: {
      AND: {
        dimensionsWCm: { gte: widthFloat },
        dimensionsHCm: { gte: heightFloat },
        price: { gte: priceSmallFloat, lte: priceHighFloat },
        packageType: packageTypeEnum,
        packagingVariation: {
          every: { color: colorList ? { in: colorList } : undefined },
        },
      },
    },
    take: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    include: {
      name: true,
      image: true,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: packaging.length, data: packaging });
};
const addPackageToCart = async (req, res, next) => {
  const { id: packagingVariantId } = req.params;

  const cart = await prisma.userCart.update({
    where: {
      userId: req.user.id,
    },
    data: {
      packagingVariation: { connect: { id: packagingVariantId } },
    },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "User Cart Updated Successfully",
    data: cart,
  });
};
module.exports = {
  searchPackages,
  addPackageToCart,
};
