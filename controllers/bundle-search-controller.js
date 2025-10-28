const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const { userConstant, adminConstant } = require("../config/constants");
const {
  ProductTags,
  ProductStatus,
  OrderStatus,
} = require("../generated/prisma");

const searchAllProducts = async (req, res, next) => {
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

  const tags =
    isFeatured == "true"
      ? ProductTags.FEATURED
      : isPopular == "true"
      ? ProductTags.POPULAR
      : isBigSale == "true"
      ? ProductTags.BIGSALE
      : undefined;
  console.log("tags", tags);
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
  let productQuerySearch = {
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
          : undefined, // id: { in: [...productIdsList, ...productOccsionsIdsList] },
        occasions: occasionsIdsList
          ? { some: { id: { in: occasionsIdsList } } }
          : undefined,
        categoryId: categoryIdsList ? { in: categoryIdsList } : undefined,
        productVariant: {
          some: {
            color: colorList ? { in: colorList } : undefined,
          },
        },
        OR: [
          { price: { gte: priceSmallFloat, lte: priceHighFloat } },
          {
            // productPrice: {
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
                productVariant: {
                  every: {
                    productStock: {
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
  //   ALTER TABLE "product"
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

  if (!(req.user && req.user.role === adminConstant)) {
    productQuerySearch = {
      ...productQuerySearch,
      ...{ status: ProductStatus.APPROVED },
    };
  }
  console.log(productQuerySearch);
  const product = await prisma.product.findMany({
    take: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    where: productQuerySearch,
    select: selectedQuery,
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};

const getProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  if (!productId) {
    throw new BadRequestError("Please send a product id");
  }
  // const searchInCart =
  //   req.user != null && req.user.role === userConstant ? true : false;
  let product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      name: true,
      discount: true,

      description: true,
      detailedDescription: true,
      category: {
        include: {
          name: true,
          image: true,
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
      productVariant: {
        include: {
          productStock: {
            include: {
              productOrder: {
                select: { status: true, order: { select: { userId: true } } },
              },
              branch: { include: { location: true } },
            },
          },
        },
      },
      image: true,
    },
  });

  if (!product) {
    throw new NotFoundError("Product not found");
  }
  // console.log(product);

  let orderUserIds = [];
  for (let i = 0; i < product.productVariant.length; i = i + 1) {
    for (
      let j = 0;
      j < product.productVariant[i].productStock.length;
      j = j + 1
    ) {
      const stock = product.productVariant[i].productStock[j];
      if (stock != undefined && stock.productOrder != undefined) {
        for (let k = 0; k < stock.productOrder.length; k = k + 1) {
          const order = stock.productOrder[k];
          if (order.status == OrderStatus.DELIVERED) {
            orderUserIds.push(order.order.userId);
          }
        }
        product.productVariant[i].productStock[j].productOrder = undefined;
      }

      // orderUserIds.push(stock.productOrder);
    }
  }
  let canBeReviewed = false;
  if (req.user != undefined && orderUserIds.includes(req.user.id)) {
    canBeReviewed = true;
  }

  // const orderUser = order.map((order) => order);
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, canBeReviewed: canBeReviewed, data: product });
};

module.exports = {
  getProduct,
  searchAllProducts,
};
