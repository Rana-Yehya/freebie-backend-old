const { ProductZodModel } = require("../models/product-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UpdateProductZodModel } = require("../models/update-product-zod-model");
const { userConstant, adminConstant } = require("../config/constants");
const getAllProductsPerOccasions = async (req, res, next) => {
  // let isAcceptedByAdmin = true;
  // if (req.user.role === adminConstant) {
  //   isAcceptedByAdmin = null;
  // }
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

  let productQuerySearch = {
    AND: [{ id: { in: productIds } }, { isAcceptedByAdmin: true }],
  };

  // if (req.user && req.user.role === adminConstant) {
  //   productQuerySearch = {
  //     id: { in: productIds },
  //   };
  // }
  const product = await prisma.product.findMany({
    where: productQuerySearch,
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
    where: productQuerySearch,
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};

const getAllProductsPerState = async (req, res, next) => {
  const stateIds = req.query.ids;
  if (stateIds == undefined || stateIds.length === 0) {
    throw new BadRequestError("Invalid state IDs");
  }
  //TODO IS THERE A BETTER IMPL
  const stateIdsList = JSON.parse(stateIds);
  const branchIds = await prisma.branch.findMany({
    where: {
      stateId: { in: stateIdsList },
    },
    select: {
      id: true,
      address: false,
      phone: false,
      isFreezed: false,
      workHours: false,
      productStock: false,
      createdAt: false,
      updatedAt: false,
    },
  });
  const branchIdsList = branchIds.map((item) => item.id);

  const productIds = await prisma.productStock.findMany({
    where: {
      branchId: { in: branchIdsList },
    },
    select: {
      product: false,
      productId: true,
      branch: false,
      branchId: false,
      stock: false,
      createdAt: false,
      updatedAt: false,
    },
  });

  const productIdsList = productIds.map((item) => item.productId);

  let productQuerySearch = {
    AND: [{ id: { in: productIdsList } }, { isAcceptedByAdmin: true }],
  };
  //   console.log(req.user);

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      id: { in: productIdsList },
    };
  }
  const product = await prisma.product.findMany({
    where: productQuerySearch,
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};
const searchAllProducts = async (req, res, next) => {
  const stateIds = req.query.stateIds;
  const categoryIds = req.query.categoryIds;
  const occasionIds = req.query.occasionIds;

  const { priceSmall, priceHigh, name } = req.query;
  const priceSmallFloat = priceSmall ? parseFloat(priceSmall) : 0.0;
  const priceHighFloat = priceHigh ? parseFloat(priceHigh) : undefined;
  // if (stateIds == undefined || stateIds.length === 0) {
  //   throw new BadRequestError("Invalid state IDs");
  // }
  // if (categoryIds == undefined || categoryIds.length === 0) {
  //   throw new BadRequestError("Invalid category IDs");
  // }
  // if (occasionIds == undefined || occasionIds.length === 0) {
  //   throw new BadRequestError("Invalid occasion IDs");
  // }
  // if( priceSmall  priceHigh, )
  //TODO IS THERE A BETTER IMPL
  const stateIdsList =
    stateIds == undefined || stateIds.length === 0
      ? undefined
      : JSON.parse(stateIds);
  const occasionsIdsList =
    occasionIds == undefined || occasionIds.length === 0
      ? undefined
      : JSON.parse(occasionIds);
  const categoryIdsList =
    categoryIds == undefined || categoryIds.length === 0
      ? undefined
      : JSON.parse(categoryIds);

  const branchIds = await prisma.branch.findMany({
    where: {
      stateId: stateIdsList ? { in: stateIdsList } : undefined,
    },
    select: {
      id: true,
      address: false,
      phone: false,
      isFreezed: false,
      workHours: false,
      productStock: false,
      createdAt: false,
      updatedAt: false,
    },
  });
  const branchIdsList = branchIds.map((item) => item.id);

  const productIds = await prisma.productStock.findMany({
    where: {
      branchId: { in: branchIdsList },
    },
    select: {
      product: false,
      productId: true,
      branch: false,
      branchId: false,
      stock: false,
      createdAt: false,
      updatedAt: false,
    },
  });

  const productIdsList = productIds.map((item) => item.productId);
  const productOccsionsIds = await prisma.productOccasion.findMany({
    where: {
      occasionsId: occasionsIdsList ? { in: occasionsIdsList } : undefined,
    },
    select: {
      occasionsId: false,
      productId: true,
      createdAt: false,
      updatedAt: false,
    },
  });
  const productOccsionsIdsList = productOccsionsIds.map(
    (item) => item.productId
  );
  // let productQuerySearch = {
  //   AND: [{ id: { in: productIdsList } }, { isAcceptedByAdmin: true }],
  // };

  let productQuerySearch = {
    AND: [
      {
        name: name ? { contains: name.trim() } : undefined,
        id: { in: [...productIdsList, ...productOccsionsIdsList] },
        // occasionsId: { in: occasionsIdsList },
        categoryId: categoryIdsList ? { in: categoryIdsList } : undefined,
        //color: { in: colorList },

        price: priceHighFloat
          ? { gte: priceSmallFloat, lte: priceHighFloat }
          : { gte: priceSmallFloat },
      },
      { isAcceptedByAdmin: true },
    ],
  };
  //   console.log(req.user);

  if (req.user && req.user.role === adminConstant) {
    productQuerySearch = {
      id: {
        name: name ? { contains: name.trim() } : undefined,
        id: { in: [...productIdsList, ...productOccsionsIdsList] },
        // occasionsId: { in: occasionsIdsList },
        categoryId: categoryIdsList ? { in: categoryIdsList } : undefined,
        //color: { in: colorList },

        price: priceHighFloat
          ? { gte: priceSmallFloat, lte: priceHighFloat }
          : { gte: priceSmallFloat },
      },
    };
  }
  const product = await prisma.product.findMany({
    where: productQuerySearch,
    include: {
      productStock: true,
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: product.length, data: product });
};

//TODO add user role (isAcceptedByAdmin) to this query
const getAllProductsPerStoreBranch = async (req, res, next) => {
  const branchId = req.query.branchId;
  //
  const productInBranch = await prisma.productStock.findMany({
    where: {
      branchId: branchId,
    },
    select: {
      product: true,
      productId: false,
      branchId: false,
      branch: false,
      stock: false,
      color: false,
    },
  });
  const productList = productInBranch.map((product) => product.product);
  // console.log(productList);
  // console.log(productInBranch.product);
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    count: productList.length,
    data: productList,
  });
};

const getProduct = async (req, res, next) => {
  const { id: productId } = req.params;
  // const searchInCart =
  //   req.user != null && req.user.role === userConstant ? true : false;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      productStock: true,
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
  getAllProductsPerOccasions,
  getAllProductsPerCategories,
  getProduct,
  getAllProductsPerState,
  searchAllProducts,
  getAllProductsPerStoreBranch,
};
