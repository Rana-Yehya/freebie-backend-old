const { CreateProductZodModel } = require("../models/create-product-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { userConstant, adminConstant } = require("../config/constants");
const {
  ProductTags,
  ProductStatus,
  OrderStatus,
} = require("../generated/prisma");

const selectedQuery = {
  id: true,
  name: true,
  // description: true,
  productPrice: true,
  price: true,
  doesNeedPreparation: true,
  avgRating: true,
  reviewsCount: true,
  // tags: true,
  // image: {
  //   select: { publicId: true, secureUrl: true },
  // },
  mainImage: {
    select: { publicId: true, secureUrl: true },
  },
  name: true,
  category: {
    select: {
      id: true,
      name: true,
      image: {
        select: { publicId: true, secureUrl: true },
      },
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
  // productVariants: {
  //   // color: true,
  //   // stock: true,

  //   select: {
  //     productStock: {
  //       select: {
  //         branch: {
  //           select: {
  //             store: {
  //               select: {
  //                 id: true,
  //                 name: true,
  //                 logo: {
  //                   select: { publicId: true, secureUrl: true },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
};
const getProductsQuery = async (req, res, next) => {
  const groupPrices = await prisma.product.aggregate({
    _max: {
      price: true, // Gets the highest price
    },
    _min: {
      price: true, // Gets the lowest price
    },
  });
  const groupActualPrices = await prisma.productPrice.aggregate({
    _max: {
      actualPrice: true, // Gets the highest price
    },
    _min: {
      actualPrice: true, // Gets the lowest price
    },
  });
  const maxPrice = groupPrices._max.price || groupActualPrices._max.actualPrice;
  const minPrice = groupActualPrices._min.actualPrice || groupPrices._min.price;
  const groupColors = await prisma.productVariant.groupBy({
    by: "color",
  });
  const colors = groupColors.map((color) => color.color);
  // console.log(colors);
  const categories = await prisma.category.findMany({
    include: { name: true },
  });
  const occasions = await prisma.occasion.findMany({
    include: { name: true },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    maxPrice: maxPrice,
    minPrice: minPrice,
    colors: colors,
    categories: categories,
    occasions: occasions,
  });
};
/*
const getAllProductsPerOccasions = async (req, res, next) => {
  // let isAcceptedByAdmin = true;
  // if (req.user.role === adminConstant) {
  //   isAcceptedByAdmin = null;
  // }
  const { page = 1, limit = 10 } = req.query;
  const occasionsIds = decodeURIComponent(req.query.ids);

  const occasionsIdsList = occasionsIds.replace(/[\[\] ]/g, "").split(",");
  if (occasionsIdsList == undefined || occasionsIdsList.length === 0) {
    throw new BadRequestError("Invalid occasions IDs");
  }
  const product = await prisma.product.findMany({
    take: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    where: {
      occasions: { every: { id: { in: occasionsIdsList } } },
    },
    select: selectedQuery,
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
const getAllProductsPerCategories = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const categoryIds = decodeURIComponent(req.query.ids);

  const categoryIdsList = categoryIds.replace(/[\[\] ]/g, "").split(",");
  console.log(categoryIdsList);

  if (categoryIdsList == undefined || categoryIdsList.length === 0) {
    throw new BadRequestError("Invalid category IDs");
  }
  let productQuerySearch = {
    AND: [{ categoryId: { in: categoryIdsList } }, { isAcceptedByAdmin: true }],
  };
  //   console.log(req.user);

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      categoryId: { in: categoryIdsList },
    };
  }
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

const getFeaturedProducts = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  let productQuerySearch = {
    AND: [{ isFeatured: true }, { isAcceptedByAdmin: true }],
  };
  //   console.log(req.user);

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      isFeatured: true,
    };
  }
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

const getPopularProducts = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  let productQuerySearch = {
    AND: [{ isPopular: true }, { isAcceptedByAdmin: true }],
  };
  //   console.log(req.user);

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      isPopular: true,
    };
  }
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

const getBigSaleProducts = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  let productQuerySearch = {
    AND: [
      {
        discountEndTime: {
          lte: new Date().toISOString(),
        },
      },
      {
        discountStartTime: {
          gte: new Date().toISOString(),
        },
      },
      {},
      { isAcceptedByAdmin: true },
    ],
  };
  //   console.log(req.user);

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      AND: [
        {
          discountEndTime: {
            lte: new Date().toISOString(),
          },
        },
        {
          discountStartTime: {
            gte: new Date().toISOString(),
          },
        },
      ],
    };
  }
  const product = await prisma.product.findMany({
    take: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    where: productQuerySearch,
    select: selectedQuery,
    orderBy: {
      price: "asc", //400 800
      discountPercent: "desc", //80 70 50 20 10
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
///canBeDeliveredOutsideState

const getAllProductsCanBeDeliveredOutsideStates = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const stateIds = decodeURIComponent(req.query.ids);

  const stateIdsList = stateIds.replace(/[\[\] ]/g, "").split(",");
  if (stateIdsList == undefined || stateIdsList.length === 0) {
    throw new BadRequestError("Invalid state IDs");
  }
  // const branchIds = await prisma.branch.findMany({
  //   where: {
  //     stateId: { not: { in: stateIdsList } },
  //     // stateId: { in: stateIdsList },
  //   },
  //   select: {
  //     id: true,
  //     address: false,
  //     phone: false,
  //     isFreezed: false,
  //     workHours: false,
  //     productStock: false,
  //     createdAt: false,
  //     updatedAt: false,
  //   },
  // });
  // { productStock : { branch: {      stateId: { not: { in: stateIdsList } }, },
  //  }}
  // const branchIdsList = branchIds.map((item) => item.id);
  console.log(stateIdsList);

  // const productIds = await prisma.productStock.findMany({
  //   where: {
  //     branch: { stateId: { not: { in: stateIdsList } } },
  //     // branchId: { in: branchIdsList },
  //   },
  //   select: {
  //     productId: true,
  //   },
  // });
  // console.log(productIds);

  // const productIdsList = productIds.map((item) => item.productId);
  // console.log(productIdsList);

  let productQuerySearch = {
    AND: [
      {
        productStock: {
          every: { branch: { stateId: { not: { in: stateIdsList } } } },
        },
      },
      { canBeDeliveredOutsideState: true },
      { isAcceptedByAdmin: true },
    ],
  };
  //   console.log(req.user);

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      AND: [
        {
          productStock: {
            every: { branch: { stateId: { not: { in: stateIdsList } } } },
          },
        },
        { canBeDeliveredOutsideState: true },
        // { isAcceptedByAdmin: true },
      ],
    };
  }
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
const getAllProductsPerState = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  // const stateIdsList = JSON.stringify(req.query.ids);
  // console.log(stateIdsList);
  const stateIdsList = decodeURIComponent(req.query.ids)
    .replace(/[\[\] ]/g, "")
    .split(",");

  console.log(stateIdsList);
  if (stateIdsList == undefined || stateIdsList.length === 0) {
    throw new BadRequestError("Invalid state IDs");
  }
  let productQuerySearch = {
    AND: [
      {
        productStock: {
          every: {
            branch: { stateId: { in: stateIdsList } },
          },
        },
      },
      { isAcceptedByAdmin: true },
    ],
  };
  //   console.log(req.user);

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      productStock: {
        every: {
          branch: { stateId: { in: stateIdsList } },
        },
      },
    };
  }
  //
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
*/
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
      : ProductTags.NONE;
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
            productPrice: {
              actualPrice: { gte: priceSmallFloat, lte: priceHighFloat },
            },
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
const getAllProductsPerStoreBranch = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const storeId = req.params;
  const products = await prisma.product.findMany({
    take: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    where: {
      productVariant: {
        every: {
          productStock: { every: { branch: { store: { id: storeId } } } },
        },
      },
    },
    select: selectedQuery,
  });
  // console.log(productList);
  // console.log(productInBranch.product);
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    count: products.length,
    data: products,
  });
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
      productPrice: true,
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
  // getAllProductsPerOccasions,
  // getAllProductsPerCategories,
  // getFeaturedProducts,
  // getBigSaleProducts,
  getProduct,
  // getAllProductsPerState,
  searchAllProducts,
  getAllProductsPerStoreBranch,
  // getPopularProducts,
  // getAllProductsCanBeDeliveredOutsideStates,
  getProductsQuery,
};
