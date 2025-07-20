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
const { createDepositPayment } = require("./transaction-controller");
const { OrderStatus, TransactionType } = require("../generated/prisma");

//for now create a function for each status

//pending, confirmed, shipped, delivered, cancelled, refunded
const getAllUserOrders = async (req, res, next) => {
  const userOrder = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: {
      location: {
        select: {
          state: {
            include: { country: { include: { name: true } }, name: true },
          },
        },
      },
      productOrder: {
        include: {
          // productStock: {
          //   include: {
          productStock: {
            select: {
              variant: {
                include: {
                  product: {
                    select: { name: true, mainImage: true },
                  },
                },
              },
            },
          },
          //   },
          // },
          // branch: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    // userCart: userCart,
    count: userOrder.length,
    data: userOrder,
  });
};

//pending, confirmed, shipped, delivered, cancelled, refunded
const getAllStoreOrders = async (req, res, next) => {
  const userOrder = await prisma.order.findMany({
    where: {
      productOrder: {
        every: {
          productStock: {
            branch: {
              storeId: req.user.id,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    // include: {
    //   //    productOrder: {
    //   //      include: {
    //   //        product: {
    //   //          include: { image: true },
    //   //        },
    //   //        branch: true,
    //   //      },
    //   //    },

    //   // id: true,
    //   userId: false,
    //   user: false,
    //   createdAt: false,
    //   updatedAt: false,
    // },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    // userCart: userCart,
    count: userOrder.length,
    data: userOrder,
  });
};

const getOrder = async (req, res, next) => {
  const { id: orderId } = req.params;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      location: {
        include: {
          state: {
            include: { name: true, country: { include: { name: true } } },
          },
        },
      },
      productOrder: {
        include: {
          orderId: false,
          productStock: {
            include: {
              variant: {
                include: {
                  product: {
                    select: { id: true, name: true, mainImage: true },
                  },
                },
              },
              branch: {
                select: {
                  id: true,
                  store: {
                    select: {
                      id: true,
                      name: true,
                      logo: true,
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

  if (!order) {
    throw new BadRequestError("Order not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: order });
};

const createOrder = async (req, res, next) => {
  const { address, notes, paymentMethod } = req.body;
  // const { id: orderId } = req.params;
  const userCart = await prisma.userCart.findUnique({
    where: {
      userId: req.user.id,
    },
    include: {
      productCart: {
        select: {
          deliveryTaxes: true,
          productStockId: true,
          productStock: {
            select: {
              variant: {
                select: {
                  id: true,
                  productId: true,
                  color: true,
                  product: {
                    select: {
                      price: true,
                      productPrice: true,
                    },
                  },
                },
              },
            },
          },
          quantity: true,
        },
      },
    },
  });

  const productOrder = userCart.productCart.map((item) => {
    return {
      variantId: item.productStock.variant.id,
      productStockId: item.productStockId,
      subtotal:
        (item.productStock.variant.product.productPrice
          ? item.productStock.variant.product.productPrice.actualPrice
          : item.productStock.variant.product.price) * item.quantity,
      // productStock: { connect: { id: item.productStockId } },
      // productStockId: item.productStockId,
      quantity: item.quantity,
      // deliveryFee: item.deliveryTaxes
    };
  });

  await prisma.userCart.delete({
    where: { userId: req.user.id },
  });
  userCart.productCart.map(async (item) => {
    await prisma.product.update({
      where: {
        id: item.productStock.variant.productId,
        // {
        //   in: userCart.productCart.map((item) => item.productStock.productId),
        // },
      },
      data: {
        productVariant: {
          update: {
            where: {
              productId_color: {
                productId: item.productStock.variant.productId,
                color: item.productStock.variant.color,
                // branchId: item.branchId,
              },
            },
            data: {
              productStock: {
                update: {
                  where: {
                    id: item.productStockId,
                  },
                  data: { stock: { decrement: item.quantity } },
                },
              },
            },
          },
        },
      },
    });
  });

  const order = await prisma.order.create({
    // where: { id: orderId },
    data: {
      trackingNumber: Math.floor(
        10000000 + Math.random() * 90000000
      ).toString(),
      user: { connect: { id: req.user.id } },
      // user: req.user,
      deliveryFee: userCart.deliveryFee,
      taxAmount: userCart.taxAmount,
      subtotal: userCart.subtotal,
      totalAmount: userCart.totalAmount,
      notes: notes,
      location: {
        create: {
          address: address,
          state: { connect: { id: req.user.stateId } },
        },
      },
      productOrder: {
        createMany: { data: productOrder },
      },
      paymentMethod: paymentMethod,
    },
  });

  if (!order) {
    throw new BadRequestError("Order was not created. Please contact support");
  }
  return res.status(StatusCodes.CREATED).json({ isSuccess: true, data: order });
};

const changeOrderStatusAsConfirmedByStore = async (req, res, next) => {
  const { id: orderId } = req.params;
  const order = await prisma.order.findMany({
    where: {
      AND: [
        { id: orderId },
        {
          productOrder: {
            every: {
              productStock: { branch: { storeId: req.user.id } },
            },
          },
        },
        { productOrder: { every: { status: OrderStatus.PENDING } } },
      ],
    },
    select: {
      productOrder: {
        select: {
          id: true,
          productStock: {
            select: {
              branchId: true,
            },
          },
          status: true,
        },
      },
    },
  });
  console.log(order);
  if (order.length == 0) {
    throw new BadRequestError(
      "The order is confirmed or you already confirmed it"
    );
  }
  console.log(order[0].productOrder);

  const productOrder = order[0].productOrder;
  let productOrderIds = [];
  for (let i = 0; i < productOrder.length; i++) {
    console.log(productOrder[i].id);
    productOrderIds.push(productOrder[i].id);
  }
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      productOrder: {
        updateMany: {
          // where: {
          //   branchId: { in: productOrderBranches },
          // },
          where: {
            id: { in: productOrderIds },
            // productStock: { every: { id: { in: branchIds } } },
            //  productStock: { every: { branch: { storeId: req.user.id } } },
          },
          data: {
            status: OrderStatus.CONFIRMED,
          },
        },
      },
    },
  });

  // await createDepositPayment({
  //   isUser: false,
  //   userId: userCart.product[0].branch.storeId,
  //   amount: order.subtotal - order.subtotal * 0.2,
  //   purpose: "create_order",
  // });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Order Status Updated Successfully",
    data: updatedOrder,
  });
};

const changeOrderStatusAsCancelledByStore = async (req, res, next) => {
  const { id: orderId } = req.params;
  console.log(req.user.id);
  const order = await prisma.order.findMany({
    where: {
      AND: [
        { id: orderId },
        {
          productOrder: {
            every: {
              productStock: { branch: { storeId: req.user.id } },
            },
          },
        },
        { productOrder: { every: { status: OrderStatus.PENDING } } },
      ],
    },
    select: {
      userId: true,
      productOrder: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  });

  if (order.length == 0) {
    throw new BadRequestError(
      "The order is confirmed or you already confirmed it"
    );
  }
  console.log(order);
  const productOrder = order[0].productOrder;
  let productOrderIds = [];
  for (let i = 0; i < productOrder.length; i++) {
    console.log(productOrder[i].id);
    productOrderIds.push(productOrder[i].id);
  }

  // const updatedOrder = await prisma.order.update({
  //   where: {
  //     id: orderId,
  //   },
  //   data: {
  //     productOrder: {
  //       updateMany: {
  //         // where: {
  //         //   branchId: { in: productOrderBranches },
  //         // },
  //         where: {
  //           id: { in: productOrderIds },
  //           // productStock: { every: { id: { in: branchIds } } },
  //           //  productStock: { every: { branch: { storeId: req.user.id } } },
  //         },
  //         data: {
  //           status: OrderStatus.CANCELLED,
  //         },
  //       },
  //     },
  //   },
  // });
  console.log(productOrder.length + 1);
  // if (order[0].productOrder.length == productOrder.length + 1) {
  //   let sum = 0;
  //   productOrderList.map((product) => {
  //     sum = sum + product.price * product.quantity;
  //   });
  //   await createDepositPayment({
  //     isUser: true,
  //     userId: order[0].userId,
  //     amount: sum + order[0].deliveryFee,
  //     purpose: "cancel_order",
  //   });
  // } else {
  //   let sum = 0;
  //   productOrderList.map((product) => {
  //     sum = sum + product.price * product.quantity;
  //   });
  //   await createDepositPayment({
  //     isUser: true,
  //     userId: order[0].userId,
  //     amount: sum,
  //     purpose: "cancel_order",
  //   });
  // }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Order Status Cancelled Successfully",
    data: updatedOrder,
  });
};

// //
// const changeOrderStatusByStore = async (req, res, next) => {
//   const { id: orderId } = req.params;
//   const { status } = req.body;
//   const order = await prisma.order.findUnique({
//     where: {
//       id: orderId,
//       productOrder: {
//         every: {
//           branch: {
//             storeId: req.user.id,
//           },
//         },
//       },
//     },
//     select: {
//       status: true,
//       productOrder: {
//         select: {
//           branchId: true,
//           status: true,
//         },
//       },
//     },
//   });
//   const getStatusIndex = OrderStatus.indexOf(status);

//   // console.log(order);
//   const productOrder = order.productOrder.filter((product) => {
//     const getIndex = OrderStatus.indexOf(product.status);
//     // console.log(getIndex);
//     // console.log(getStatusIndex);
//     return getStatusIndex - 1 >= getIndex ? product : null;
//   });
//   const productOrderBranches = order.productOrder.map(
//     (product) => product.branchId
//   );
//   // console.log(productOrder);

//   // console.log(productOrder.length);
//   const generalStatus =
//     productOrder.length <= 1 ? status : OrderStatus[getStatusIndex - 1];

//   const updatedOrder = await prisma.order.update({
//     where: {
//       id: orderId,
//     },
//     data: {
//       status: generalStatus,
//       productOrder: {
//         updateMany: {
//           where: {
//             branchId: { in: productOrderBranches },
//           },
//           data: {
//             status: status,
//           },
//         },
//         // branch: {
//         //   storeId: req.user.id,
//         // },
//       },
//     },
//     include: {
//       productOrder: true,
//     },
//   });

//   // await createDepositPayment({
//   //   isUser: false,
//   //   userId: userCart.product[0].branch.storeId,
//   //   amount: order.subtotal - order.subtotal * 0.2,
//   //   purpose: "create_order",
//   // });
//   return res.status(StatusCodes.OK).json({
//     isSuccess: true,
//     message: "Order Status Updated Successfully",
//     data: updatedOrder,
//   });
// };

const changeOrderStatusAsShippedByStore = async (req, res, next) => {
  const { id: orderId } = req.params;
  const order = await prisma.order.findMany({
    where: {
      AND: [
        { id: orderId },
        {
          productOrder: {
            every: {
              productStock: { branch: { storeId: req.user.id } },
            },
          },
        },
        { productOrder: { every: { status: OrderStatus.CONFIRMED } } },
      ],
    },
    select: {
      productOrder: {
        select: {
          id: true,
          subtotal: true,
          // quantity: true,
          // status: true,
        },
      },
    },
  });
  console.log(order);
  if (order.length == 0) {
    throw new BadRequestError(
      "Order has not been confirmed or it is already shipped"
    );
  }
  const productOrder = order[0].productOrder;
  let productOrderIds = [];
  let sum = 0;

  for (let i = 0; i < productOrder.length; i++) {
    console.log(productOrder[i].id);
    productOrderIds.push(productOrder[i].id);
    sum = sum + productOrder[i].subtotal;
  }

  // let productOrderList = [];

  // order.productOrder.map((product) => {
  //   console.log(product.branch.storeId);
  //   if (product.branch.storeId == req.user.id) {
  //     productOrderList.push(product);
  //   }
  // });
  // if (
  //   productOrderList.map(
  //     (product) =>
  //       product.status === "confirmed" || product.status !== "pending"
  //   )
  // ) {
  //   throw new BadRequestError(
  //     "The order is confirmed or you already confirmed it"
  //   );
  // }

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      // status: generalStatus,
      productOrder: {
        updateMany: {
          where: {
            id: { in: productOrderIds },
          },
          data: {
            status: OrderStatus.SHIPPED,
          },
        },
        // branch: {
        //   storeId: req.user.id,
        // },
      },
    },
  });

  await createDepositPayment({
    type: TransactionType.DEPOSIT,
    isUser: false,
    userId: req.user.id,
    amount: sum - sum * 0.2,
    purpose: "order_shipped",
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Order Status Shipped Successfully",
    data: updatedOrder,
  });
};

const changeOrderStatusAsDeliveredByStore = async (req, res, next) => {
  const { id: orderId } = req.params;
  const { id: storeId } = req.body;

  const order = await prisma.order.findMany({
    where: {
      AND: [
        { id: orderId },
        {
          productOrder: {
            every: {
              productStock: { branch: { storeId: storeId } },
            },
          },
        },
        { productOrder: { every: { status: OrderStatus.SHIPPED } } },
      ],
    },
    select: {
      status: true,
      productOrder: {
        select: {
          id: true,
          subtotal: true,
          quantity: true,
          branchId: true,
          status: true,
        },
      },
    },
  });
  console.log(order);
  if (order.length == 0) {
    throw new BadRequestError(
      "Order has not been confirmed or it is already delivered"
    );
  }

  // let productOrderList = [];

  // order.productOrder.map((product) => {
  //   console.log(product.branch.storeId);
  //   if (product.branch.storeId == req.user.id) {
  //     productOrderList.push(product);
  //   }
  // });
  // if (
  //   productOrderList.map(
  //     (product) =>
  //       product.status === "confirmed" || product.status !== "pending"
  //   )
  // ) {
  //   throw new BadRequestError(
  //     "The order is confirmed or you already confirmed it"
  //   );
  // }

  const productOrder = order[0].productOrder;
  let productOrderIds = [];
  for (let i = 0; i < productOrder.length; i++) {
    console.log(productOrder[i]);
    productOrderIds.push(productOrder[i].id);
    // sum = sum + productOrder[i][0].subtotal;
  }
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      // status: generalStatus,
      productOrder: {
        updateMany: {
          where: {
            id: { in: productOrderIds },
          },
          data: {
            status: OrderStatus.DELIVERED,
          },
        },
        // branch: {
        //   storeId: req.user.id,
        // },
      },
    },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Order Status Updated Successfully",
    data: updatedOrder,
  });
};

// const updateOrderStatus = async (req, res, next) => {
//   const { id: orderId } = req.params;
//   const { status } = req.body;
//   // console.log(Object.entries(OrderStatus));
//   // console.log(status);
//   // console.log(status.toString().toLowerCase());
//   // console.log(OrderStatus.includes(status.toString().toLowerCase()));
//   if (!OrderStatus.includes(status.toString().toLowerCase())) {
//     throw new BadRequestError("Status is not correct..");
//   }
//   const order = await prisma.order.update({
//     where: { id: orderId },
//     data: {
//       status: status.toString().toLowerCase(),
//     },
//   });

//   if (!order) {
//     throw new BadRequestError("Order not found.");
//   }
//   return res.status(StatusCodes.OK).json({
//     isSuccess: true,
//     message: "Order Status Updated Successfully",
//     data: order,
//   });
// };

const cancelOrderByUser = async (req, res, next) => {
  const { id: orderId } = req.params;
  const { cancellationReason } = req.body;
  if (!cancellationReason) {
    throw new BadRequestError("Please provide a reason for cancellation");
  }
  //TODO WHAT IF THE ORDER IS PREPARING OR DELIVERING
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      // AND: [
      //   { id: orderId },
      //   // { productOrder: { every: { branch: { storeId: req.user.id } } } },
      //   {
      //     productOrder: {
      //       every: {
      //         status:
      //           OrderStatus.CONFIRMED ||
      //           OrderStatus.SHIPPED ||
      //           OrderStatus.DELIVERED ||
      //           OrderStatus.CANCELLED ||
      //           OrderStatus.REFUNDED,
      //       },
      //     },
      //   },
      // ],
    },
    select: {
      taxAmount: true,
      deliveryFee: true,
      subtotal: true,
      totalAmount: true,
      productOrder: {
        select: {
          id: true,
          status: true,
          variant: {
            select: {
              product: {
                select: {
                  doesNeedPreparation: true,
                },
              },
            },
          },
          productStock: {
            select: {
              branch: {
                select: {
                  storeId: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const canOrderBeCancelled = order.productOrder.find(
    (productOrder) =>
      productOrder.status == OrderStatus.CONFIRMED ||
      productOrder.status == OrderStatus.SHIPPED ||
      productOrder.status == OrderStatus.DELIVERED ||
      productOrder.status == OrderStatus.CANCELLED ||
      productOrder.status == OrderStatus.REFUNDED
  );
  console.log(canOrderBeCancelled);
  if (canOrderBeCancelled != undefined) {
    throw new BadRequestError("Order can not be cancelled now");
  }
  // if (orderStatusListToNotAcceptCancellation.includes(order.status)) {
  //   throw new BadRequestError("Order cannot be cancelled.");
  // }
  let productOrderIds = [];
  for (let i = 0; i < order.productOrder.length; i++) {
    console.log(order.productOrder[i].id);
    productOrderIds.push(order.productOrder[i].id);
  }
  // if (doesNeedPreparation.includes(true)) {
  //   await createDepositPayment({
  //     type: TransactionType.DEPOSIT,
  //     isUser: true,
  //     userId: req.user.id,
  //     amount: order.totalAmount - order.totalAmount * 0.2,
  //     purpose: "cancel_order",
  //   });
  //   //TODO what if a lot of stores are preparing
  //   // createDepositPayment({
  //   //   isUser: true,
  //   //   userId: req.user.id,
  //   //   amount: order.totalAmount - order.totalAmount * 0.8,
  //   //   purpose: "cancel_order",
  //   // });
  // } else {
  await createDepositPayment({
    type: TransactionType.DEPOSIT,
    isUser: true,
    userId: req.user.id,
    amount: order.totalAmount,
    purpose: "cancel_order",
  });
  // }
  const orderUpdated = await prisma.order.update({
    where: { id: orderId },
    data: {
      cancellationReason: cancellationReason,
      refundAmount: order.totalAmount,
      productOrder: {
        updateMany: {
          where: {
            id: { in: productOrderIds },
          },
          data: {
            status: OrderStatus.CANCELLED,
          },
        },
      },
    },
  });
  console.log(orderUpdated);

  // if (!order) {
  //   throw new BadRequestError("Order not found.");
  // }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Order Cancelled Successfully",
  });
};

module.exports = {
  getAllUserOrders,
  getOrder,
  createOrder,
  changeOrderStatusAsDeliveredByStore,
  // updateOrderStatus,
  getAllStoreOrders,
  changeOrderStatusAsConfirmedByStore,
  changeOrderStatusAsCancelledByStore,
  changeOrderStatusAsShippedByStore,
  cancelOrderByUser,
  // changeOrderStatusByStore,
};
