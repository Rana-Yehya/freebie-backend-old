const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UserProductZodModel } = require("../models/user-product-zod-model");
// const {
//   UpdateUserProductZodModel,
// } = require("../models/update-user-product-zod-model");
const { ProductCartStatus } = require("../generated");
const getAllCartItems = async (req, res, next) => {
  const userCart = await prisma.userCart.findUnique({
    where: {
      userId: req.user.id,
      // AND: [
      //   { userId: req.user.id },
      //   { productCart: { every: { isDeleted: false } } },
      // ],
    },
    include: {
      productCart: {
        include: {
          deliveryTaxes: true,
          productStock: {
            include: {
              branch: {
                select: { location: { select: { stateId: true } } },
              },
              variant: {
                include: {
                  product: { include: { mainImage: true, name: true } },
                },
              },
              // branch: {select: },
            },
          },
        },
      },

      // id: true,
      userId: false,
      user: false,
      createdAt: false,
      updatedAt: false,
    },
  });
  console.log(userCart);

  // if (userCart) {
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
  if (
    !(
      userCart == null ||
      userCart.productCart == undefined ||
      userCart.productCart == null
    )
  ) {
    userCart.productCart.forEach(async (item) => {
      // (
      //   (productStock) => productStock.branch.id === item.branch.id
      // );
      const stock = item.productStock.stock;
      const productStockId = item.productStock.id;
      const branchState = item.productStock.branch.location.stateId;
      const branchDeliveryTaxes = item.deliveryTaxes.originStateId;
      const userDeliveryTaxes = item.deliveryTaxes.destinationStateId;
      let deliveryStates;
      let productCartStatus;

      if (
        branchState != branchDeliveryTaxes ||
        userDeliveryTaxes != req.user.state.id
      ) {
        console.log(branchState);
        console.log(branchDeliveryTaxes);
        console.log(userDeliveryTaxes);
        console.log(req.user.state.id);
        deliveryStates = await prisma.deliveryTaxes.findFirst({
          where: {
            originStateId: branchState,
            destinationStateId: req.user.state.id,
          },
          select: {
            id: true,
            // originStateId: true,
            // // baseFee: true,
            // destinationStateId: true,
          },
          orderBy: {
            baseFee: "desc",
          },
        });
        productCartStatus = ProductCartStatus.ACTIVE;

        // console.log(deliveryStates);
        if (!deliveryStates) {
          productCartStatus = ProductCartStatus.NODELIVERYSTATES;
          //TODO NODELIVERYSTATES
          // throw new BadRequestError("No delivery state found");
        } else if (
          item.productStock.variant.product.canBeDeliveredOutsideState == false
        ) {
          productCartStatus = ProductCartStatus.NODELIVERYSTATES;
        }
      }
      // if (userDeliveryTaxes != req.user.state.id) {
      //   console.log(branchState);
      //   console.log(branchDeliveryTaxes);
      //   console.log(userDeliveryTaxes);
      //   console.log(req.user.state.id);
      // }
      // console.log(item.quantity);

      // console.log(stock);
      if (stock < item.quantity) {
        // throw new BadRequestError("Stock is not enough");
        if (productCartStatus == ProductCartStatus.ACTIVE) {
          productCartStatus = ProductCartStatus.OUTOFSTOCK;
          // await prisma.userCart.update({
          //   where: { userId: req.user.id },
          //   data: {
          //     product: {
          //       update: {
          //         where: {
          //           userCartUserId_productStockId: {
          //             userCartUserId: req.user.id,
          //             productStockId: productStockId,
          //           },
          //         },
          //         data: {
          //           doesHaveEnoughQuantity: false,
          //           quantity: stock,
          //           oldQuantity: item.quantity,
          //         },
          //       },
          //     },
          //   },
          // });
        }
      } else if (stock >= item.oldQuantity) {
        if (productCartStatus == ProductCartStatus.OUTOFSTOCK) {
          productCartStatus = ProductCartStatus.ACTIVE;
          // await prisma.userCart.update({
          //   where: { userId: req.user.id },
          //   data: {
          //     product: {
          //       update: {
          //         where: {
          //           userCartUserId_productStockId: {
          //             userCartUserId: req.user.id,
          //             productStockId: productStockId,
          //           },
          //         },
          //         data: {
          //           doesHaveEnoughQuantity: true,
          //           quantity: item.quantity,
          //           oldQuantity: 0,
          //         },
          //       },
          //     },
          //   },
          // });
        }
      }
      console.log(productCartStatus);
      console.log(
        deliveryStates != undefined
          ? { connect: { id: deliveryStates.id } }
          : undefined
      );
      if (productCartStatus) {
        console.log(deliveryStates);
        await prisma.userCart.update({
          where: { userId: req.user.id },
          data: {
            productCart: {
              update: {
                where: {
                  userCartUserId_productStockId: {
                    userCartUserId: req.user.id,
                    productStockId: productStockId,
                  },
                },
                data: {
                  status: productCartStatus || undefined,
                  quantity:
                    productCartStatus == ProductCartStatus.OUTOFSTOCK
                      ? stock
                      : productCartStatus == ProductCartStatus.ACTIVE
                      ? item.oldQuantity
                      : undefined,
                  oldQuantity:
                    productCartStatus == ProductCartStatus.OUTOFSTOCK
                      ? item.quantity
                      : productCartStatus == ProductCartStatus.ACTIVE
                      ? stock
                      : undefined,
                  deliveryTaxes:
                    deliveryStates != undefined
                      ? { connect: { id: deliveryStates.id } }
                      : undefined,
                },
              },
            },
          },
        });
      }
    });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    // userCart: userCart,
    count:
      userCart != null
        ? userCart.productCart == undefined
          ? 0
          : userCart.productCart.length
        : 0,
    cartId: userCart != null ? userCart.id : null,
    subtotal: userCart != null ? userCart.subtotal : 0,
    taxAmount: userCart != null ? userCart.taxAmount : 0,
    deliveryFee: userCart != null ? userCart.deliveryFee : 0,
    totalAmount: userCart != null ? userCart.totalAmount : 0,
    data: userCart != null ? userCart.productCart : [],
  });
  // } else {
  //   return res.status(StatusCodes.OK).json({
  //     isSuccess: true,
  //     message: "Cart is empty",
  //     // cartId: userCartId.id,
  //     // count: productsList.length,
  //     // data: productsList,
  //   });
  // }
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

const createUpdateCartItem = async (req, res, next) => {
  const { productVariantId, quantity } = req.body;
  const zodModel = UserProductZodModel.safeParse({
    // userCartId: userCartId,
    // userProducts: productUser,
    // stateId: stateId,
    // productId: productId,
    productVariantId: productVariantId,
    quantity: quantity,
  });

  // console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const productVariant = await prisma.productVariant.findUnique({
    where: { id: productVariantId },
    select: {
      id: true,
      color: true,
      product: true,
      productStock: {
        select: {
          id: true,
          stock: true,
          branch: { select: { id: true, location: true } },
        },
      },
    },
  });
  if (!productVariant) {
    throw new NotFoundError("Product not found");
  }
  // console.log(product.productVariant[0].productStock[0].branch);

  // const productVariants = product.productVariant.find(
  //   (variant) => variant.id == productVariantId // color
  // );
  // console.log(productStock);
  let productStocks = [];
  console.log(productVariant);
  let statesIds = [];
  // if (productVariants.length == undefined) {
  //&& productVariants != undefined
  productVariant.productStock.map((stock) => {
    // console.log(stock);
    productStocks.push(stock);
    console.log(stock);
    console.log(stock.branch.location);

    statesIds.push(stock.branch.location.stateId);
  });
  // } else {
  //   for (let i = 0; i < productVariants.length; i++) {
  //     // console.log(productStock[i]);
  //     productVariants[i].map((stock) => {
  //       // console.log(stock);
  //       productStocks.push(stock);
  //       statesIds.push(stock.branch.location.stateId);
  //     });
  //   }
  // }
  if (
    productVariant.product.canBeDeliveredOutsideState == false &&
    !statesIds.includes(req.user.stateId)
  ) {
    throw new BadRequestError(
      "You can't purchase this item outside of your state"
    );
  }
  let coloredProductStock = [];
  // productVariants.map((element) => {
  if (!productVariant.product.doesNeedPreparation) {
    productVariant.productStock.map((stock) => {
      stock.stock >= quantity ? coloredProductStock.push(stock) : undefined;
    });
  } else {
    coloredProductStock.push(productVariants.productStock);
  }
  const deliveryStates = await prisma.deliveryTaxes.findFirst({
    where: {
      originStateId: {
        in: coloredProductStock.map(
          (element) => element.branch.location.stateId
        ),
      },
      destinationStateId: req.user.stateId,
    },
    select: {
      id: true,
      originStateId: true,
      // baseFee: true,
      destinationStateId: true,
    },
    orderBy: {
      baseFee: "desc",
    },
  });

  // console.log(deliveryStates);
  if (!deliveryStates) {
    throw new NotFoundError("No delivery state found");
  }
  let productStock = [];
  for (let i = 0; i < coloredProductStock.length; i++) {
    const element = coloredProductStock[i];
    console.log(element.branch.location.stateId);
    console.log(deliveryStates.originStateId);
    const found =
      element.branch.location.stateId == deliveryStates.originStateId;
    if (found) {
      productStock.push(element);
      break;
    }
  }
  console.log(productStock);
  console.log("userCart", req.user.id);
  console.log("productStock", productStock[0].id);
  const createdOrUpdatedUserCart = await prisma.userCart.upsert({
    where: { userId: req.user.id },
    update: {
      // user: {},
      productCart: {
        upsert: {
          create: {
            productStock: { connect: { id: productStock[0].id } },
            quantity: quantity,
            deliveryTaxes: { connect: { id: deliveryStates.id } },
            status: ProductCartStatus.ACTIVE,
          },
          where: {
            userCartUserId_productStockId: {
              userCartUserId: req.user.id,
              productStockId: productStock[0].id,
            },
          },
          update: {
            quantity: quantity,
            deliveryTaxes: { connect: { id: deliveryStates.id } },
            status: ProductCartStatus.ACTIVE,
          },
        },
        // connectOrCreate: {
        //   where: {
        //     userCartUserId_productStockId: {
        //       userCartUserId: req.user.id,
        //       productStockId: productStock[0].id,
        //     },
        //   },
        //   create: {
        //     productStock: { connect: { id: productStock[0].id } },
        //     quantity: quantity,
        //     deliveryTaxes: { connect: { id: deliveryStates.id } },
        //     status: ProductCartStatus.ACTIVE,
        //   },
        // },
        // update: {
        //   where: {
        //     userCartUserId_productStockId: {
        //       userCartUserId: req.user.id,
        //       productStockId: productStock[0].id,
        //     },
        //   },
        //   data: {
        //     status: ProductCartStatus.ACTIVE,
        //     quantity: quantity,
        //     deliveryTaxes: { connect: { id: deliveryStates.id } },
        //   },
        // },
        // create: {
        //   productStock: { connect: { id: productStock[0].id } },
        //   quantity: quantity,
        //   deliveryTaxes: { connect: { id: deliveryStates.id } },
        //   status: ProductCartStatus.ACTIVE,
        // },
      },
    },
    create: {
      user: { connect: { id: req.user.id } },
      productCart: {
        // connectOrCreate: {
        //   where: {
        //     userCartUserId_productStockId: {
        //       userCartUserId: req.user.id,
        //       productStockId: productStock[0].id,
        //     },
        //   },
        //   create: {
        //     status: ProductCartStatus.ACTIVE,
        //     productStock: { connect: { id: productStock[0].id } },
        //     // userCart: { connect: { userId: req.user.id } },
        //     quantity: quantity,
        //     deliveryTaxes: { connect: { id: deliveryStates.id } },
        //   },
        // },
        create: {
          status: ProductCartStatus.ACTIVE,
          productStock: { connect: { id: productStock[0].id } },
          // userCart: { connect: { userId: req.user.id } },
          quantity: quantity,
          deliveryTaxes: { connect: { id: deliveryStates.id } },
        },
      },
    },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Added to cart successfully"),
    data: createdOrUpdatedUserCart,
  });
};

// const updateCartQuantity = async (req, res, next) => {
//   const { productId, color, quantity, productStockId } = req.body;
//   const zodModel = UpdateUserProductZodModel.safeParse({
//     // productId: productId,
//     // color: color,
//     quantity: quantity,
//     productStockId: productStockId,
//   });
//   if (!zodModel.success) {
//     throw new BadRequestError(zodModel.error.errors[0].message);
//   }
//   const userCartId = req.user.id;
//   // if(userCart.)
//   //TODO SHOULD I CHECK FOR THE STOCK AND THE BRANCH IF IT EXISTS OR NOT
//   const updatedUserCart = await prisma.userCart.update({
//     where: { userId: userCartId },
//     data: {
//       productCart: {
//         update: {
//           where: {
//             userCartUserId_productStockId: {
//               userCartUserId: req.user.id,
//               productStockId: productStockId,
//               // productStock: {
//               //   variant: { productId: productId, color: color },
//               //   id: productStockId,
//               // },
//             },
//           },
//           data: {
//             quantity: quantity,
//           },
//         },
//       },
//     },
//   });
//   return res.status(StatusCodes.OK).json({
//     isSuccess: true,
//     message: "Cart updated successfully",
//     data: updatedUserCart,
//   });
//   // if (stateId) {
//   //   const country = await prisma.state.findUnique({
//   //     where: { id: stateId },
//   //   });
//   //   if (!country) {
//   //     throw new BadRequestError("State not found");
//   //   }
//   // }
//   // const updatedUserCart = await prisma.userCart.update({
//   //   where: { id: id },
//   //   data: {
//   //     name: name || undefined,
//   //     stateId: stateId || undefined,
//   //   },
//   // });
//   // console.log(updatedUserCart);
//   // return res
//   //   .status(StatusCodes.CREATED)
//   //   .json({ isSuccess: true, data: updatedUserCart });
// };
// const updateCartQuantity = async (req, res, next) => {
//   const { productId, color, quantity, branchId } = req.body;
//   const zodModel = UpdateUserProductZodModel.safeParse({
//     productId: productId,
//     color: color,
//     quantity: quantity,
//     // branchId: branchId,
//   });
//   if (!zodModel.success) {
//     throw new BadRequestError(zodModel.error.errors[0].message);
//   }
//   const userCartId = req.user.id;
//   const userCart = await prisma.userCart.findUnique({
//     where: {
//       userId: userCartId,
//       productCart: {
//         every: {
//           productStock: {
//             productId: productId,
//             color: color,
//           },
//         },
//       },
//     },
//     select: {
//       productCart: {
//         select: {
//           productStock: {
//             select: {
//               id: true,
//               stock: true,
//               color: true,
//               product: {
//                 select: {
//                   doesNeedPreparation: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });
//   console.log(userCart.productCart);

//   const productStock = userCart.productCart.map(
//     (product) => product.productStock
//   );
//   console.log(productStock);
//   // let coloredProductStock = [];
//   const doesNeedPreparation =
//     userCart.productCart[0].productStock.product.doesNeedPreparation;
//   console.log(doesNeedPreparation);
//   let coloredProductStock = [];
//   productStock.map((element) => {
//     if (!doesNeedPreparation[0]) {
//       // if (element.stock != undefined && element.stock > 0) {
//       //   if (element.stock < quantity) {
//       //     //  throw new BadRequestError("Not enough stock");
//       //   }
//       // }

//       element.color == color && element.stock >= quantity
//         ? coloredProductStock.push(element)
//         : undefined;
//     } else {
//       element.color == color ? coloredProductStock.push(element) : undefined;
//     }
//     // console.log(element);
//     // element.color == color && element.stock >= quantity
//     //   ? coloredProductStock.push(element)
//     //   : undefined;
//   });
//   // productStock.map((element) => {
//   //   element.color == color ? coloredProductStock.push(element) : undefined;
//   // });
//   console.log(coloredProductStock);
//   if (coloredProductStock.length == 0) {
//     throw new BadRequestError("Not enough stock");
//   }
//   // if(userCart.)
//   //TODO SHOULD I CHECK FOR THE STOCK AND THE BRANCH IF IT EXISTS OR NOT
//   const updatedUserCart = await prisma.userCart.update({
//     where: { userId: userCartId },
//     data: {
//       productCart: {
//         update: {
//           where: {
//             userCartUserId_productStockId: {
//               userCartUserId: req.user.id,
//               productStockId: productStock[0].id,
//             },
//           },
//           data: {
//             quantity: quantity,
//           },
//         },
//       },
//     },
//   });
//   return res.status(StatusCodes.OK).json({
//     isSuccess: true,
//     message: "Cart updated successfully",
//     data: updatedUserCart,
//   });
//   // if (stateId) {
//   //   const country = await prisma.state.findUnique({
//   //     where: { id: stateId },
//   //   });
//   //   if (!country) {
//   //     throw new BadRequestError("State not found");
//   //   }
//   // }
//   // const updatedUserCart = await prisma.userCart.update({
//   //   where: { id: id },
//   //   data: {
//   //     name: name || undefined,
//   //     stateId: stateId || undefined,
//   //   },
//   // });
//   // console.log(updatedUserCart);
//   // return res
//   //   .status(StatusCodes.CREATED)
//   //   .json({ isSuccess: true, data: updatedUserCart });
// };
//TODO is there a better impl?
const deleteCartItem = async (req, res, next) => {
  // const { productId: productId, color: color } = req.query;
  const productStockId = req.params.id;
  if (!productStockId) {
    throw new BadRequestError("Please enter a product stock id");
  }
  // console.log(productId, color, userCartId);
  await prisma.productCart.delete({
    where: {
      userCartUserId_productStockId: {
        productStockId: productStockId,
        userCartUserId: req.user.id,
      },
      //AND: [{ id: req.user.id }, { productStockId: productStockId }],
    },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "User Cart Item deleted successfully" });
};

const deleteCart = async (req, res, next) => {
  const userId = req.user.id;
  await prisma.userCart.delete({
    where: {
      userId: userId,
    },
  });

  // await prisma.userCart.delete({
  //   where: { id: userCartId },
  // });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "User Cart deleted successfully" });
};

const calculateSubTotal = async (req, res, next) => {
  let userCart = await prisma.userCart.findUnique({
    where: {
      userId: req.user.id,
    },
    select: {
      subtotal: true,
      totalAmount: true,
      deliveryFee: true,
      taxAmount: true,
      productCart: {
        select: {
          productStock: {
            select: {
              variant: {
                include: {
                  product: { select: { price: true, productPrice: true } },
                },
              },
            },
            // include: { : true },
          },
          // branch: true,
          quantity: true,
        },
      },
    },
  });
  console.log(userCart);
  let sum = 0;
  userCart.productCart.forEach((item) => {
    const price =
      item.productStock.variant.product.productPrice == undefined
        ? item.productStock.variant.product.price
        : item.productStock.variant.product.productPrice.actualPrice;
    sum += price * item.quantity;
  });
  console.log(sum);
  if (userCart.subtotal != sum) {
    const totalAmount = userCart.totalAmount - userCart.subtotal + sum;

    userCart = await prisma.userCart.update({
      where: { userId: req.user.id },
      data: {
        subtotal: sum,
        totalAmount: totalAmount,
      },
    });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    subtotal: userCart.subtotal,
    totalAmount: userCart.totalAmount,
    // message: "User Cart deleted successfully",
  });
};

const calculateDeliveryFees = async (req, res, next) => {
  let userCart = await prisma.userCart.findUnique({
    where: {
      userId: req.user.id,
    },
    select: {
      subtotal: true,
      totalAmount: true,
      deliveryFee: true,
      taxAmount: true,
      productCart: {
        select: {
          deliveryTaxes: true,
          productStock: {
            select: {
              variant: {
                include: {
                  product: {
                    select: {
                      weightInKg: true,
                      price: true,
                      productPrice: true,
                    },
                  },
                },
              },
            },
            // include: { : true },
          },
          // branch: true,
          quantity: true,
        },
      },
    },
  });
  console.log(userCart.product);
  let sum = 0;

  userCart.productCart.forEach((item) => {
    console.log(item.deliveryTaxes);
    console.log(item.product);
    sum += item.deliveryTaxes.baseFee;
    if (
      item.deliveryTaxes.additionalFeesAfterKg <
      item.productStock.variant.product.weightInKg * item.quantity
    ) {
      sum +=
        (item.productStock.variant.product.weightInKg * item.quantity -
          item.deliveryTaxes.additionalFeesAfterKg) *
        item.deliveryTaxes.feePerKg;
    }
  });
  console.log(sum);
  if (userCart.deliveryFee != sum) {
    const totalAmount = userCart.totalAmount - userCart.deliveryFee + sum;

    // const totalAmount = sum + userCart.subtotal + userCart.taxAmount;
    userCart = await prisma.userCart.update({
      where: { userId: req.user.id },
      data: {
        deliveryFee: sum,
        totalAmount: totalAmount,
      },
    });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    deliveryFee: userCart.deliveryFee,
    totalAmount: userCart.totalAmount,
    // message: "User Cart deleted successfully",
  });
};
module.exports = {
  getAllCartItems,
  deleteCartItem,
  createUpdateCartItem,
  // updateCartQuantity,
  calculateSubTotal,
  calculateDeliveryFees,
  deleteCart,
};
