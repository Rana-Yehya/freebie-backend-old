const { UserCartZodModel } = require("../models/user-cart-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UserProductZodModel } = require("../models/user-product-zod-model");
const {
  UpdateUserProductZodModel,
} = require("../models/update-user-product-zod-model");
const getAllCartItems = async (req, res, next) => {
  const userCart = await prisma.userCart.findUnique({
    where: { userId: req.user.id },
    include: {
      product: {
        include: {
          product: {
            include: { image: true, productStock: true },
          },
          branch: true,
        },
      },

      // id: true,
      userId: false,
      user: false,
      createdAt: false,
      updatedAt: false,
    },
  });
  if (userCart) {
    // const productsList = await prisma.productUser.findMany({
    //   where: { userCartId: userCartId.id },
    //   include: {
    //     product: true,
    //     userCartId: false,
    //     productId: false,
    //     createdAt: false,
    //     updatedAt: false,
    //   },
    // });
    // const productsList = userCarts.map((item) => item.product);
    // console.log(productsList);
    // const productUser = await prisma.productUser.findMany({
    //   where: { userCartId: { in: userCarts.map((cart) => cart.id) } },
    // });
    return res.status(StatusCodes.OK).json({
      isSuccess: true,
      // userCart: userCart,
      count: userCart.product.length,
      cartId: userCart.id,
      subtotal: userCart.subtotal,
      taxAmount: userCart.taxAmount,
      deliveryFee: userCart.deliveryFee,
      data: userCart.product,
    });
  } else {
    return res.status(StatusCodes.OK).json({
      isSuccess: true,
      message: "Cart is empty",
      // cartId: userCartId.id,
      // count: productsList.length,
      // data: productsList,
    });
  }
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
  const { productId, color, quantity } = req.body;
  const zodModel = UserProductZodModel.safeParse({
    // userCartId: userCartId,
    // userProducts: productUser,
    // stateId: stateId,
    productId: productId,
    color: color,
    quantity: quantity,
  });

  // console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      productStock: {
        select: {
          branchId: true,
          stock: true,
          color: true,
          branch: {
            select: {
              stateId: true,
            },
          },
        },
      },
    },
  });
  if (!product) {
    throw new BadRequestError("Product not found");
  }

  const statesIds = product.productStock.map((stock) => stock.branch.stateId);
  if (
    product.canBeDeliveredOutsideState == false &&
    !statesIds.includes(req.user.stateId)
  ) {
    throw new BadRequestError(
      "You can't purchase this item outside of your state."
    );
  }
  let coloredProductStock = [];
  product.productStock.map((element) => {
    if (!product.doesNeedPreparation) {
      // if (element.stock != undefined && element.stock > 0) {
      //   if (element.stock < quantity) {
      //     //  throw new BadRequestError("Not enough stock");
      //   }
      // }

      element.color == color && element.stock >= quantity
        ? coloredProductStock.push(element)
        : undefined;
    } else {
      element.color == color ? coloredProductStock.push(element) : undefined;
    }
    // console.log(element);
    // element.color == color && element.stock >= quantity
    //   ? coloredProductStock.push(element)
    //   : undefined;
  });
  console.log(coloredProductStock);
  let branchWithStates = [];
  coloredProductStock.map((element) => {
    const found = product.productStock.find(
      (stock) => stock.branchId == element.branchId
    );
    if (found) {
      branchWithStates.push(found);
    }
  });
  console.log("branchWithStates");

  console.log(branchWithStates);
  const deliveryStates = await prisma.deliveryTaxes.findFirst({
    where: {
      originStateId: {
        in: branchWithStates.map((element) => element.branch.stateId),
      },
      destinationStateId: req.user.stateId,
    },
    select: {
      id: true,
      baseFee: true,
      destinationStateId: true,
    },
    orderBy: {
      baseFee: "desc",
    },
  });

  console.log(deliveryStates);

  const branch = branchWithStates.find(
    (element) => element.branch.stateId == deliveryStates.destinationStateId
  );
  console.log(branch);

  const userCart = await prisma.userCart.findUnique({
    where: { userId: req.user.id },
    select: {
      deliveryFee: true,
      subtotal: true,
    },
  });
  let deliveryFee = deliveryStates.baseFee;
  let subtotal = quantity * product.actualPrice;
  if (userCart) {
    subtotal = userCart.subtotal + subtotal;

    if (deliveryFee < userCart.deliveryFee) {
      deliveryFee = userCart.deliveryFee;
    }
  }
  const productUser = {
    productId: productId,
    color: color,
    quantity: quantity,
    deliveryTaxesId: deliveryStates.id,
    branchId: branch.branchId,
  };

  const createdOrUpdatedUserCart = await prisma.userCart.upsert({
    where: { userId: req.user.id },

    update: {
      subtotal: subtotal,
      deliveryFee: deliveryFee,
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
      subtotal: subtotal,
      deliveryFee: deliveryFee,
    },
  });

  // for (let j = 0; j < productStock.length; j++) {
  //   if (productStock[j].color !== productUser[i].color) {
  //     throw new BadRequestError("Color does not exist");
  //   }
  // if (coloredProductStock == undefined) {
  //   throw new BadRequestError("Color does not exist");
  // }
  // if (coloredProductStock.stock != undefined && coloredProductStock.stock > 0) {
  //   if (coloredProductStock.stock < quantity) {
  //     throw new BadRequestError("Not enough stock");
  //   }
  // }

  // }
  // productUser[i].userCartId = req.user.id;
  // const createdUserCart = await prisma.userCart.upsert({
  //   where: {
  //     userId: req.user.id,
  //   },

  //   update: {
  //     product: {
  //       createMany: {
  //         data: productUser,
  //       },
  //     },
  //   },
  //   create: {
  //     userId: req.user.id,
  //     product: {
  //       createMany: {
  //         data: productUser,
  //       },
  //     },
  //   },
  //   include: {
  //     product: true,
  //   },
  // });

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Added to cart successfully",
    data: createdOrUpdatedUserCart,
  });
};

const updateCartQuantity = async (req, res, next) => {
  const { productId, color, quantity, branchId } = req.body;
  const zodModel = UpdateUserProductZodModel.safeParse({
    productId: productId,
    color: color,
    quantity: quantity,
    branchId: branchId,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const userCartId = req.params.id;
  if (!userCartId) {
    throw new BadRequestError("Please send an ID");
  }
  const userCart = await prisma.userCart.findUnique({
    where: {
      id: userCartId,
      product: {
        every: {
          branch: {
            id: branchId,
          },
        },
      },
    },
    select: {
      product: {
        select: {
          product: {
            select: {
              doesNeedPreparation: true,
              productStock: true,
            },
          },
        },
      },
    },
  });
  console.log(userCart.product);

  const productStock = userCart.product.flatMap(
    (product) => product.product.productStock
  );
  console.log(productStock);
  // let coloredProductStock = [];
  const doesNeedPreparation = userCart.product[0].product.doesNeedPreparation;
  console.log(doesNeedPreparation);
  let coloredProductStock = [];
  productStock.map((element) => {
    if (!doesNeedPreparation[0]) {
      // if (element.stock != undefined && element.stock > 0) {
      //   if (element.stock < quantity) {
      //     //  throw new BadRequestError("Not enough stock");
      //   }
      // }

      element.color == color && element.stock >= quantity
        ? coloredProductStock.push(element)
        : undefined;
    } else {
      element.color == color ? coloredProductStock.push(element) : undefined;
    }
    // console.log(element);
    // element.color == color && element.stock >= quantity
    //   ? coloredProductStock.push(element)
    //   : undefined;
  });
  console.log(coloredProductStock);
  if (coloredProductStock.length == 0) {
    throw new BadRequestError("Not enough stock");
  }
  // if(userCart.)
  //TODO SHOULD I CHECK FOR THE STOCK AND THE BRANCH IF IT EXISTS OR NOT
  const updatedUserCart = await prisma.userCart.update({
    where: { id: userCartId },
    data: {
      product: {
        update: {
          where: {
            userCartId_productId_color_branchId: {
              userCartId: userCartId,
              productId: productId,
              color: color,
              branchId: branchId,
            },
          },
          data: {
            quantity: quantity,
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
