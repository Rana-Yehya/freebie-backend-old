const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const searchAllBundles = async (req, res, next) => {
  const stateIds = req.query.stateIds;
  const { page = 1, limit = 10 } = req.query;
  const { priceSmall, priceHigh, isFeatured, isPopular, isBigSale, name } =
    req.query;

  let priceSmallFloat = undefined;
  if (priceSmall && parseFloat(priceSmall) !== NaN) {
    priceSmallFloat = parseFloat(priceSmall);
  }
  let priceHighFloat = undefined;
  if (priceHigh && parseFloat(priceHigh) !== NaN) {
    priceHighFloat = parseFloat(priceHigh);
  }
  console.log(
    "isFeatured ",
    isFeatured,
    " isPopular",
    isPopular,
    " isBigSale",
    isBigSale
  );
  const colorList = req.query.colors
    ? decodeURIComponent(req.query.colors)
        .replace(/[\[\] ]/g, "")
        .split(",")
    : undefined;
  const categoryIdsList = req.query.categoryIds
    ? decodeURIComponent(req.query.categoryIds)
        .replace(/[\[\] ]/g, "")
        .split(",")
    : undefined;
  const occasionsIdsList = req.query.occasionIds
    ? decodeURIComponent(req.query.occasionIds)
        .replace(/[\[\] ]/g, "")
        .split(",")
    : undefined;
  const stateIdList = req.query.stateIds
    ? decodeURIComponent(req.query.stateIds)
        .replace(/[\[\] ]/g, "")
        .split(",")
    : undefined;
  console.log(colorList);
  /*
  let bundleQuerySearch = {
    AND: [
      {
        name: name
          ? {
              OR: [
                { default: { contains: name.trim() } },
                { en: { contains: name.trim() } },
                { ar: { contains: name.trim() } },
              ],
            }
          : undefined, // id: { in: [...bundleIdsList, ...bundleOccsionsIdsList] },
        occasions: occasionsIdsList
          ? { some: { id: { in: occasionsIdsList } } }
          : undefined,
        categoryId: categoryIdsList ? { in: categoryIdsList } : undefined,
        bundleVariant: {
          some: {
            color: colorList ? { in: colorList } : undefined,
          },
        },
        OR: [
          { price: { gte: priceSmallFloat, lte: priceHighFloat } },
          {
            // bundlePrice: {
            actualPrice: { gte: priceSmallFloat, lte: priceHighFloat },
            //            },
          },
        ],
        tags: tags,
        // actualPrice: { gte: priceSmallFloat, lte: priceHighFloat },
        OR: [
          { canBeDeliveredOutsideState: true },
          {
            AND: [
              {
                bundleVariant: {
                  every: {
                    bundleStock: {
                      every: {
                        branch: {
                          location: { state: { id: { in: stateIdList } } },
                        },
                      },
                    },
                  },
                },
              },

              { canBeDeliveredOutsideState: false },
            ],
          },
        ],
      },
    ],
  };
  */
  //   ALTER TABLE "bundle"
  // DROP COLUMN IF EXISTS "actualPrice";
  //   ADD COLUMN "actualPrice" FLOAT GENERATED ALWAYS AS (
  //   CASE
  //     WHEN "discountPercent" IS NOT NULL
  //       AND "discountStartTime" IS NOT NULL
  //       AND "discountEndTime" IS NOT NULL
  //       AND NOW() BETWEEN "discountStartTime" AND "discountEndTime"
  //     THEN "price" * (1 - "discountPercent")
  //     ELSE "price"
  //   END
  // ) STORED;
  //   console.log(req.user);

  // if (!(req.user && req.user.role === adminConstant)) {
  //   bundleQuerySearch = {
  //     ...bundleQuerySearch,
  //     ...{ status: BundleStatus.APPROVED },
  //   };
  // }
  // console.log(bundleQuerySearch);
  const bundle = await prisma.bundle.findMany({
    take: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    where: {
      name: name
        ? {
            OR: [
              { default: { contains: name.trim() } },
              { en: { contains: name.trim() } },
              { ar: { contains: name.trim() } },
            ],
          }
        : undefined,
      bundlePrice: { gte: priceSmallFloat, lte: priceHighFloat },
      bundleItems: {
        some: {
          productVariant: {
            color: colorList ? { in: colorList } : undefined,
            product: {
              occasions: occasionsIdsList
                ? { some: { id: { in: occasionsIdsList } } }
                : undefined,
              categoryId: categoryIdsList ? { in: categoryIdsList } : undefined,
            },
          },
        },
      },
    },
    include: {
      name: true,
      mainImage: true,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: bundle.length, data: bundle });
};

const getBundle = async (req, res, next) => {
  const { id: bundleId } = req.params;
  if (!bundleId) {
    throw new BadRequestError("Please send a bundle id");
  }
  // const searchInCart =
  //   req.user != null && req.user.role === userConstant ? true : false;
  let bundle = await prisma.bundle.findUnique({
    where: { id: bundleId },
    include: {
      name: true,

      mainImage: true,
      bundleItems: {
        include: {
          productVariant: {
            include: {
              product: {
                include: {
                  mainImage: true,
                  image: true,
                  category: {
                    include: {
                      image: true,
                      name: true,
                    },
                  },

                  occasions: {
                    select: {
                      id: true,
                      name: true,
                      image: {
                        select: { publicId: true, secureUrl: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  // if (!bundle) {
  //   throw new NotFoundError("Bundle not found");
  // }
  // // console.log(bundle);

  // let orderUserIds = [];
  // for (let i = 0; i < bundle.bundleVariant.length; i = i + 1) {
  //   for (let j = 0; j < bundle.bundleVariant[i].bundleStock.length; j = j + 1) {
  //     const stock = bundle.bundleVariant[i].bundleStock[j];
  //     if (stock != undefined && stock.bundleOrder != undefined) {
  //       for (let k = 0; k < stock.bundleOrder.length; k = k + 1) {
  //         const order = stock.bundleOrder[k];
  //         if (order.status == OrderStatus.DELIVERED) {
  //           orderUserIds.push(order.order.userId);
  //         }
  //       }
  //       bundle.bundleVariant[i].bundleStock[j].bundleOrder = undefined;
  //     }

  //     // orderUserIds.push(stock.bundleOrder);
  //   }
  // }
  // let canBeReviewed = false;
  // if (req.user != undefined && orderUserIds.includes(req.user.id)) {
  //   canBeReviewed = true;
  // }

  // const orderUser = order.map((order) => order);

  // canBeReviewed: canBeReviewed,
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: bundle });
};

module.exports = {
  getBundle,
  searchAllBundles,
};
