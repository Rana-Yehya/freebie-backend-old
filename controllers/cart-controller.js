const { UserCartZodModel } = require("../models/user-cart-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UserProductZodModel } = require("../models/user-product-zod-model");
const getAllCartItems = async (req, res, next) => {
  const userCarts = await prisma.userCart.findMany({
    include: {
      product: true,
    },
  });
  // const productUser = await prisma.productUser.findMany({
  //   where: { userCartId: { in: userCarts.map((cart) => cart.id) } },
  // });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    count: userCarts.length,
    data: userCarts,
  });
};
// const deleteCartItem = async (req, res, next) => {
//   const {
//     userCartId: userCartId,
//     productId: productId,
//     color: color,
//   } = req.params;
//   const userCart = await prisma.productUser.delete({
//     where: { userCartId: userCartId, productId: productId, color: color },
//   });
//   if (!userCart) {
//     throw new BadRequestError("User Cart not found");
//   }
//   return res.status(StatusCodes.OK).json({ isSuccess: true, data: userCart });
// };

const createCartItem = async (req, res, next) => {
  const { productUser, stateId } = req.body;
  const zodModel = UserCartZodModel.safeParse({
    // userCartId: userCartId,
    userProducts: productUser,
    stateId: stateId,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const product = await prisma.product.findUnique({
    where: { id: productUser.productId },
  });
  if (!product) {
    throw new BadRequestError("Product not found");
  }

  // if (product.doesNeedPreparation == false) {
  const branchIds = await prisma.branch.findMany({
    where: { stateId: stateId },
    select: { id: true },
  });
  if (
    productUser.canBeDeliveredOutsideState == false &&
    (branchIds == undefined || branchIds.length == 0)
  ) {
    throw new BadRequestError(
      "You can't purchase this item outside of your state."
    );
  }
  console.log("branchIds");
  console.log(branchIds);

  const branchIdsList = branchIds.map((item) => item.id);
  console.log("branchIdsList");
  console.log(branchIdsList);
  const productStock = await prisma.productStock.findMany({
    where: { productId: product.id, branchId: { in: branchIdsList } },
  });
  console.log("productStock");
  console.log(productStock);
  const coloredProductStock = productStock.find(function (element) {
    return element.color == productUser.color;
  });
  // for (let j = 0; j < productStock.length; j++) {
  //   if (productStock[j].color !== productUser[i].color) {
  //     throw new BadRequestError("Color does not exist");
  //   }
  if (coloredProductStock == undefined) {
    throw new BadRequestError("Color does not exist");
  }
  if (coloredProductStock.stock != undefined && coloredProductStock.stock > 0) {
    if (coloredProductStock.stock < productUser[i].quantity) {
      throw new BadRequestError("Not enough stock");
    }
  }

  // }
  // productUser[i].userCartId = req.user.id;
  const createdUserCart = await prisma.userCart.upsert({
    where: {
      userId: req.user.id,
    },

    update: {
      product: {
        createMany: {
          data: productUser,
        },
      },
    },
    create: {
      userId: req.user.id,
      product: {
        createMany: {
          data: productUser,
        },
      },
    },
    include: {
      product: true,
    },
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdUserCart });
};

const updateCartQuantity = async (req, res, next) => {
  const { productUser } = req.body;
  const zodModel = UserProductZodModel.safeParse({
    productId: productUser.productId,
    color: productUser.color,
    quantity: productUser.quantity,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const userCartId = req.params.id;
  if (!userCartId) {
    throw new BadRequestError("Please send an ID");
  }
  //TODO SHOULD I CHECK FOR THE STOCK AND THE BRANCH IF IT EXISTS OR NOT
  const updatedUserCart = await prisma.userCart.update({
    where: { id: userCartId },
    data: {
      product: {
        update: {
          where: {
            userCartId_productId_color: {
              userCartId: userCartId,
              productId: productUser.productId,
              color: productUser.color,
            },
          },
          data: {
            quantity: productUser.quantity,
          },
        },
      },
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: updatedUserCart });
  // if (stateId) {
  //   const country = await prisma.state.findUnique({
  //     where: { id: stateId },
  //   });
  //   if (!country) {
  //     throw new BadRequestError("State not found");
  //   }
  // }
  // const updatedUserCart = await prisma.userCart.update({
  //   where: { id: id },
  //   data: {
  //     name: name || undefined,
  //     stateId: stateId || undefined,
  //   },
  // });
  // console.log(updatedUserCart);
  // return res
  //   .status(StatusCodes.CREATED)
  //   .json({ isSuccess: true, data: updatedUserCart });
};

const deleteCartItem = async (req, res, next) => {
  const { productId: productId, color: color } = req.query;
  const userCartId = req.params.id;
  console.log(productId, color, userCartId);
  await prisma.productUser.delete({
    where: {
      userCartId_productId_color: {
        userCartId: userCartId,
        productId: productId,
        color: color,
      },
    },
  });
  const userCart = await prisma.userCart.findUnique({
    where: { id: userCartId },
    include: {
      product: true,
    },
  });

  if (userCart.product.length == 0) {
    await prisma.userCart.delete({
      where: { id: userCartId },
    });
  }

  // await prisma.userCart.delete({
  //   where: { id: userCartId },
  // });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "UserCart deleted successfully" });
};

module.exports = {
  getAllCartItems,
  deleteCartItem,
  createCartItem,
  updateCartQuantity,
};
