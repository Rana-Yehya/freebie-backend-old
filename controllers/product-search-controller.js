const { CreateProductZodModel } = require("../models/create-product-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UpdateProductZodModel } = require("../models/update-product-zod-model");
const { userConstant, adminConstant } = require("../config/constants");
const { productTags } = require("../generated/prisma");

const selectedQuery = {
  id: true,
  name: true,
  // description: true,
  productPrice: true,
  price: true,
  doesNeedPreparation: true,
  isAvailable: true,
  avgRating: true,
  reviewsCount: true,
  tags: true,
  image: {
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
  productStock: {
    // color: true,
    // stock: true,
    select: {
      branch: {
        select: {
          store: {
            select: {
              id: true,
              name: true,
              logo: {
                select: { publicId: true, secureUrl: true },
              },
            },
          },
        },
      },
    },
  },
};
const getProductsQuery = async (req, res, next) => {
  const groupPrices = await prisma.product.aggregate({
    _max: {
      actualPrice: true, // Gets the highest price
    },
    _min: {
      actualPrice: true, // Gets the lowest price
    },
  });
  const maxPrice = groupPrices._max.actualPrice;
  const minPrice = groupPrices._min.actualPrice;
  const groupColors = await prisma.productStock.groupBy({
    by: "color",
  });
  const colors = groupColors.map((color) => color.color);
  // console.log(colors);
  const categories = await prisma.category.findMany({});
  const occasions = await prisma.occasion.findMany({});

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
  const { priceSmall, priceHigh, isFeatured, isPopular, name } = req.query;

  let priceSmallFloat = undefined;
  if (priceSmall && parseFloat(priceSmall) !== NaN) {
    priceSmallFloat = parseFloat(priceSmall);
  }
  let priceHighFloat = undefined;
  if (priceHigh && parseFloat(priceHigh) !== NaN) {
    priceHighFloat = parseFloat(priceHigh);
  }
  const tags =
    isFeatured == "true"
      ? productTags.FEATURED
      : isPopular == "true"
      ? productTags.POPULAR
      : undefined;
  console.log(tags);
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

  // let productQuerySearch = {
  //   AND: [{ id: { in: productIdsList } }, { isAcceptedByAdmin: true }],
  // };
  //TODO DISCOUNT IS NOT ACCOUNTED FOR
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
        productStock: {
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
      },
      { isAcceptedByAdmin: true },
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

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      name: name
        ? {
            OR: [
              { default: { contains: name.trim() } },
              { en: { contains: name.trim() } },
              { ar: { contains: name.trim() } },
            ],
          }
        : undefined,
      // id: { in: [...productIdsList, ...productOccsionsIdsList] },
      occasions:
        occasionsIdsList || occasionsIdsList.length != 0
          ? { every: { id: { in: occasionsIdsList } } }
          : undefined,
      categoryId:
        categoryIdsList || categoryIdsList.length != 0
          ? { in: categoryIdsList }
          : undefined,
      productStock: {
        some: {
          color:
            colorList || colorList.length != 0 ? { in: colorList } : undefined,
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
    };
  }
  const product = await prisma.product.findMany({
    take: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    // where: { tags: tags },
    where: productQuerySearch,
    // where: {
    //   OR: [
    //     { price: { gte: priceSmallFloat, lte: priceHighFloat } },
    //     {
    //       productPrice: {
    //         actualPrice: { gte: priceSmallFloat, lte: priceHighFloat },
    //       },
    //     },
    //   ],
    // },
    // where: {
    //   name: {
    //     OR: [
    //       { nameAr: { contains: name.trim() } },
    //       { nameEn: { contains: name.trim() } },
    //       { defaultName: { contains: name.trim() } },
    //     ],
    //   },
    // },
    select: selectedQuery,
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
// const searchAllProducts = async (req, res, next) => {
//   const stateIds = req.query.stateIds;
//   const categoryIds = req.query.categoryIds;
//   const occasionIds = req.query.occasionIds;
//   const { page = 1, limit = 10 } = req.query;
//   const { priceSmall, priceHigh, name } = req.query;
//   const priceSmallFloat = priceSmall ? parseFloat(priceSmall) : 0.0;
//   const priceHighFloat = priceHigh ? parseFloat(priceHigh) : undefined;
//   // if (stateIds == undefined || stateIds.length === 0) {
//   //   throw new BadRequestError("Invalid state IDs");
//   // }
//   // if (categoryIds == undefined || categoryIds.length === 0) {
//   //   throw new BadRequestError("Invalid category IDs");
//   // }
//   // if (occasionIds == undefined || occasionIds.length === 0) {
//   //   throw new BadRequestError("Invalid occasion IDs");
//   // }
//   // if( priceSmall  priceHigh, )
//   //TODO IS THERE A BETTER IMPL
//   const stateIdsList =
//     stateIds == undefined || stateIds.length === 0
//       ? undefined
//       : JSON.parse(stateIds);
//   const occasionsIdsList =
//     occasionIds == undefined || occasionIds.length === 0
//       ? undefined
//       : JSON.parse(occasionIds);
//   const categoryIdsList =
//     categoryIds == undefined || categoryIds.length === 0
//       ? undefined
//       : JSON.parse(categoryIds);

//   const branchIds = await prisma.branch.findMany({
//     where: {
//       stateId: stateIdsList ? { in: stateIdsList } : undefined,
//     },
//     select: {
//       id: true,
//       address: false,
//       phone: false,
//       isFreezed: false,
//       workHours: false,
//       productStock: false,
//       createdAt: false,
//       updatedAt: false,
//     },
//   });
//   const branchIdsList = branchIds.map((item) => item.id);

//   const productIds = await prisma.productStock.findMany({
//     where: {
//       branchId: { in: branchIdsList },
//     },
//     select: {
//       product: false,
//       productId: true,
//       branch: false,
//       branchId: false,
//       stock: false,
//       createdAt: false,
//       updatedAt: false,
//     },
//   });

//   const productIdsList = productIds.map((item) => item.productId);
//   const productOccsionsIds = await prisma.productOccasion.findMany({
//     where: {
//       occasionsId: occasionsIdsList ? { in: occasionsIdsList } : undefined,
//     },
//     select: {
//       occasionsId: false,
//       productId: true,
//       createdAt: false,
//       updatedAt: false,
//     },
//   });
//   const productOccsionsIdsList = productOccsionsIds.map(
//     (item) => item.productId
//   );
//   // let productQuerySearch = {
//   //   AND: [{ id: { in: productIdsList } }, { isAcceptedByAdmin: true }],
//   // };

//   let productQuerySearch = {
//     AND: [
//       {
//         name: name ? { contains: name.trim() } : undefined,
//         id: { in: [...productIdsList, ...productOccsionsIdsList] },
//         // occasionsId: { in: occasionsIdsList },
//         categoryId: categoryIdsList ? { in: categoryIdsList } : undefined,
//         //color: { in: colorList },

//         price: priceHighFloat
//           ? { gte: priceSmallFloat, lte: priceHighFloat }
//           : { gte: priceSmallFloat },
//       },
//       { isAcceptedByAdmin: true },
//     ],
//   };
//   //   console.log(req.user);

//   if (req.user && req.user.role === adminConstant) {
//     productQuerySearch = {
//       id: {
//         name: name ? { contains: name.trim() } : undefined,
//         id: { in: [...productIdsList, ...productOccsionsIdsList] },
//         // occasionsId: { in: occasionsIdsList },
//         categoryId: categoryIdsList ? { in: categoryIdsList } : undefined,
//         //color: { in: colorList },

//         price: priceHighFloat
//           ? { gte: priceSmallFloat, lte: priceHighFloat }
//           : { gte: priceSmallFloat },
//       },
//     };
//   }
//   const product = await prisma.product.findMany({
//     take: parseInt(limit) || 10,
//     skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
//     where: productQuerySearch,
//     include: {
//       productStock: true,
//     },
//   });
//   return res
//     .status(StatusCodes.OK)
//     .json({ isSuccess: true, count: product.length, data: product });
// };

//TODO add user role (isAcceptedByAdmin) to this query
const getAllProductsPerStoreBranch = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const branchId = decodeURIComponent(req.query.branchId)
    .replace(/[\[\] ]/g, "")
    .split(",");

  const products = await prisma.product.findMany({
    take: parseInt(limit) || 10,
    skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
    where: {
      productStock: { every: { branchId: { in: branchId } } },
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
  // const searchInCart =
  //   req.user != null && req.user.role === userConstant ? true : false;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: {
        include: {
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
      productStock: {
        select: {
          id: true,
          branch: true,
          stock: true,
          color: true,
        },
      },
      image: true,
    },
  });

  //  const productUser =  searchInCart ?
  // await prisma.userCart.findMany({
  //     where: {
  //       userId: req.user.id,
  //       productId: productId,
  //     },
  //   }) : undefined;

  // const productStock = await prisma.productStock.findMany({
  //   where: { productId: productId },
  // });
  if (!product) {
    throw new BadRequestError("Product not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: product });
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
