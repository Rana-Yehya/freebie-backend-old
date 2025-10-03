const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const {
  CreateDiscountZodModel,
} = require("../models/create-discount-zod-model");
const {
  UpdateDiscountZodModel,
} = require("../models/update-discount-zod-model");

const getAllStoreDiscounts = async (req, res, next) => {
  // }
  // productUser[i].userCartId = req.user.id;
  const discounts = await prisma.discount.findMany({
    where: {
      storeId: req.user.id,
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: discounts, count: discounts.length });
};
const createDiscount = async (req, res, next) => {
  const { discountPercent, discountStartTime, discountEndTime } = req.body;
  const zodModel = CreateDiscountZodModel.safeParse({
    discountPercent: discountPercent,
    discountStartTime: discountStartTime,
    discountEndTime: discountEndTime,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const parseDiscountStartTime = Date.parse(discountStartTime);
  const dateDiscountStartTime = new Date(parseDiscountStartTime);

  const parseDiscountEndTime = Date.parse(discountEndTime);
  const dateDiscountEndTime = new Date(parseDiscountEndTime);
  const exuistingDiscount = await prisma.discount.findFirst({
    where: {
      AND: [
        { storeId: req.user.id },
        { discountStartTime: { gte: dateDiscountStartTime } },
        { discountEndTime: { lte: dateDiscountEndTime } },
      ],
    },
  });

  removeStoreDiscountQueue({
    productId: updatedProduct.id,
    delay: dateDiscountEndTime,
  });
  addStoreDiscountQueue({
    productId: updatedProduct.id,
    delay: dateDiscountEndTime,
  });
  if (exuistingDiscount) {
    throw new BadRequestError("There is another discount in this time range");
  }
  const discount = await prisma.discount.create({
    data: {
      discountPercent: discountPercent,
      discountStartTime: discountStartTime,
      discountEndTime: discountEndTime,
      store: { connect: { id: req.user.id } },
    },
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: discount });
};
const updateDiscount = async (req, res, next) => {
  const { id } = req.params;
  const { discountPercent, discountStartTime, discountEndTime } = req.body;
  const zodModel = UpdateDiscountZodModel.safeParse({
    id: id,
    discountPercent: discountPercent,
    discountStartTime: discountStartTime,
    discountEndTime: discountEndTime,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const discount = await prisma.discount.findUnique({
    where: { id: id },
  });
  if (!discount) {
    throw new BadRequestError("Discount not found");
  }

  //   const parseDiscountStartTime = Date.parse(discount.discountStartTime);
  //   const dateDiscountStartTime = new Date(parseDiscountStartTime);

  //   const parseDiscountEndTime = Date.parse(discount.discountEndTime);
  //   const dateDiscountEndTime = new Date(parseDiscountEndTime);
  const exuistingDiscount = await prisma.discount.findFirst({
    where: {
      AND: [
        { storeId: req.user.id },
        { discountStartTime: { gte: discount.discountStartTime } },
        { discountEndTime: { lte: discount.discountEndTime } },
      ],
    },
  });
  if (exuistingDiscount) {
    throw new BadRequestError("There is another discount in this time range");
  }
  const updatedDiscount = await prisma.discount.update({
    where: { id: id },
    data: {
      discountPercent: discountPercent,
      discountStartTime: discountStartTime,
      discountEndTime: discountEndTime,
      store: { connect: { id: req.user.id } },
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: updatedDiscount });
};
const deleteDiscount = async (req, res, next) => {
  const { id } = req.params;

  const discount = await prisma.discount.findUnique({
    where: { id: id },
  });
  if (!discount) {
    throw new BadRequestError("Discount not found");
  }

  //   const parseDiscountStartTime = Date.parse(discount.discountStartTime);
  //   const dateDiscountStartTime = new Date(parseDiscountStartTime);

  //   const parseDiscountEndTime = Date.parse(discount.discountEndTime);
  //   const dateDiscountEndTime = new Date(parseDiscountEndTime);
  if (
    discount.discountStartTime < new Date() &&
    discount.discountEndTime > new Date()
  ) {
    await prisma.product.updateMany({
      where: {
        productVariant: {
          every: {
            productStock: { every: { branch: { storeId: req.user.id } } },
          },
        },
      },
      data: {
        actualPrice: undefined,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            productVariant: {
              every: {
                productStock: { every: { branch: { storeId: req.user.id } } },
              },
            },
          },
          {
            discount: {
              AND: [
                { discountStartTime: { gte: discount.discountStartTime } },
                { discountEndTime: { lte: discount.discountEndTime } },
              ],
            },
          },
        ],
      },

      select: {
        id: true,
        price: true,
        discount: true,
      },
    });
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const actualPrice =
        parseFloat(product.price) -
        parseFloat(product.price) * parseFloat(product.discountPercent);

      const updatedProduct = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          actualPrice: actualPrice,
        },
      });
      if (!updatedProduct) {
        throw new BadRequestError(
          "Something went wrong when updating a product that actually had a discount"
        );
      }
    }
  }
  await prisma.discount.delete({
    where: {
      id: id,
    },
  });

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Discount deleted successfully" });
};
module.exports = {
  getAllStoreDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};
