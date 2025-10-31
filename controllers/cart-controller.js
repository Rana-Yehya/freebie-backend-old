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
const { ProductCartStatus } = require("../generated/prisma");
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
      bundleCart: true,
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
    productCart: userCart != null ? userCart.productCart : [],
    bundleCart: userCart != null ? userCart.bundleCart : [],
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
      bundleCart: true,
      productCart: {
        select: {
          productStock: {
            select: {
              variant: {
                include: {
                  product: { select: { price: true, actualPrice: true } },
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
      item.productStock.variant.product.actualPrice == undefined
        ? item.productStock.variant.product.price
        : item.productStock.variant.product.actualPrice;
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
                      actualPrice: true,
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
  // updateCartQuantity,
  calculateSubTotal,
  calculateDeliveryFees,
  deleteCart,
};
