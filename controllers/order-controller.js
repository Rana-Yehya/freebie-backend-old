const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { createDepositPayment } = require("./transaction-controller");
const {
  OrderStatus,
  TransactionType,
  UserOrderStatus,
} = require("../generated/prisma");
const { OrderStatusZodModel } = require("../models/order-status-zod-model");
//for now create a function for each status

//pending, confirmed, shipped, delivered, cancelled, refunded
const getAllUserOrders = async (req, res, next) => {
  // const hasUserCreatedNewOrder = await verifyUserOrderHelper({
  //   userId: req.user.id,
  // });

  const userOrder = await prisma.order.findMany({
    where: { AND: [{ userId: req.user.id }, { status: UserOrderStatus.PAID }] },
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
    // hasUserCreatedNewOrder: hasUserCreatedNewOrder == "true" ? true : null,
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
  // await createOrderHelper({ userId: req.user.id });
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
                      actualPrice: true,
                      weightInKg: true,
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
    let deliverySum = item.deliveryTaxes.baseFee;
    if (
      item.deliveryTaxes.additionalFeesAfterKg <
      item.productStock.variant.product.weightInKg * item.quantity
    ) {
      deliverySum +=
        (item.productStock.variant.product.weightInKg * item.quantity -
          item.deliveryTaxes.additionalFeesAfterKg) *
        item.deliveryTaxes.feePerKg;
    }
    return {
      // variantId: item.productStock.variant.id,
      productStockId: item.productStockId,
      price: item.productStock.variant.product.actualPrice
        ? item.productStock.variant.product.actualPrice
        : item.productStock.variant.product.price,
      deliveryFee: deliverySum,
      subtotal:
        (item.productStock.variant.product.actualPrice
          ? item.productStock.variant.product.actualPrice
          : item.productStock.variant.product.price) * item.quantity,
      // productStock: { connect: { id: item.productStockId } },
      // productStockId: item.productStockId,
      quantity: item.quantity,
      // deliveryFee: item.deliveryTaxes
    };
  });

  // await prisma.userCart.delete({
  //   where: { userId: req.user.id },
  // });
  // userCart.productCart.map(async (item) => {
  //   await prisma.product.update({
  //     where: {
  //       id: item.productStock.variant.productId,
  //       // {
  //       //   in: userCart.productCart.map((item) => item.productStock.productId),
  //       // },
  //     },
  //     data: {
  //       productVariant: {
  //         update: {
  //           where: {
  //             productId_color: {
  //               productId: item.productStock.variant.productId,
  //               color: item.productStock.variant.color,
  //               // branchId: item.branchId,
  //             },
  //           },
  //           data: {
  //             productStock: {
  //               update: {
  //                 where: {
  //                   id: item.productStockId,
  //                 },
  //                 data: { stock: { decrement: item.quantity } },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // });

  const order = await prisma.order.create({
    // where: { id: orderId },
    data: {
      trackingNumber: Math.floor(
        10000000 + Math.random() * 90000000
      ).toString(),
      user: { connect: { id: req.user.id } },
      status: UserOrderStatus.UNPAID,
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
const createPaidOrder = async (req, res, next) => {
  const { userId, orderId } = req.body;
  const userCart = await prisma.userCart.findUnique({
    where: {
      userId: userId,
    },
    include: {
      productCart: {
        select: {
          deliveryTaxes: true,
          productStockId: true,
          productStock: {
            select: {
              stock: true,
              variant: {
                select: {
                  id: true,
                  productId: true,
                  color: true,
                  product: {
                    select: {
                      price: true,
                      actualPrice: true,
                      doesNeedPreparation: true,
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
  await prisma.userCart.delete({
    where: { userId: userId },
  });
  for (let i = 0; i < userCart.productCart.length; i++) {
    const item = userCart.productCart[i];
    if (item.productStock.variant.product.doesNeedPreparation != true) {
      //TODO SHOULD I CHECK FOR THE NUMBER BEING GREATER THAN ZERO
      //&& item.productStock.stock
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
                id: item.productStock.variant.id,
                // productId_color: {
                //   productId: item.productStock.variant.productId,
                //   color: item.productStock.variant.color,
                //   // branchId: item.branchId,
                // },
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
    }
  }
  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: UserOrderStatus.PAID,
    },
  });
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: order });
};

const deleteUnpaidOrder = async (req, res, next) => {
  const { id: orderId } = req.params;

  const order = await prisma.order.delete({
    where: { id: orderId },
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Order is not completed", data: order });
};

const changeOrderStatusByStore = async (req, res, next) => {
  // const {} = req.params;
  const { id: orderId, status, cancellationReason } = req.body;
  const zodModel = OrderStatusZodModel.safeParse({
    orderId: orderId,
    status: status,
    cancellationReason: cancellationReason,
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const statusIndex = Object.values(OrderStatus).indexOf(status.toUpperCase());
  // console.log(Object.values(OrderStatus).every()[statusIndex]);
  const orderStatus = Object.values(OrderStatus)[statusIndex];
  let orderStatusOfInterest = [];
  let refundToUser = false;
  if (orderStatus == OrderStatus.CONFIRMED) {
    orderStatusOfInterest = [OrderStatus.PENDING];
  } else if (orderStatus == OrderStatus.CANCELLED) {
    orderStatusOfInterest = [OrderStatus.PENDING];
    refundToUser = true;
  } else if (orderStatus == OrderStatus.SHIPPED) {
    orderStatusOfInterest = [OrderStatus.CONFIRMED, OrderStatus.PENDING];
  }
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
        { productOrder: { every: { status: { in: orderStatusOfInterest } } } },
      ],
    },
    select: {
      userId: true,
      productOrder: {
        include: {
          // id: true,
          // deliveryFee: true,
          // subtotal: true,
          productStock: {
            include: {
              variant: {
                include: {
                  product: true,
                },
              },
            },
          },
          // status: true,
        },
      },
    },
  });
  // console.log(order);
  if (order.length == 0) {
    throw new BadRequestError(
      `The order is ${status} or you already ${status} it`
    );
  }
  // console.log(order[0].productOrder);
  const productOrder = order[0].productOrder;
  let productOrderIds = [];
  let refundSum = 0;
  for (let i = 0; i < productOrder.length; i++) {
    console.log(productOrder[i].id);
    productOrderIds.push(productOrder[i].id);
    if (refundToUser == true) {
      refundSum += productOrder[i].deliveryFee + productOrder[i].subtotal;
    }
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
            status: Object.values(OrderStatus)[statusIndex],
            cancellationReason: cancellationReason || undefined,
          },
        },
      },
    },
  });
  if (status == OrderStatus.CANCELLED) {
    productOrder.map(async (item) => {
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
                    data: { stock: { increment: item.quantity } },
                  },
                },
              },
            },
          },
        },
      });
    });
  }
  if (refundToUser == true) {
    await createDepositPayment({
      type: TransactionType.DEPOSIT,
      isUser: true,
      userId: order[0].userId,
      amount: refundSum,
      purpose: "cancel_order",
    });
  }
  // await createDepositPayment({
  //   isUser: false,
  //   userId: userCart.product[0].branch.storeId,
  //   amount: order.subtotal - order.subtotal * 0.2,
  //   purpose: "create_order",
  // });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Order Status Updated Successfully"),
    data: updatedOrder,
  });
};

const changeOrderStatusAsDeliveredByAdmin = async (req, res, next) => {
  const { orderId, storeId } = req.body;

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
      productOrder: {
        select: {
          id: true,
          commissionRate: true,
          subtotal: true,
          quantity: true,
          // productStock: {
          //   select: {
          //     branch: { select: { store: { select: { subscription: true } } } },
          //   },
          // },
          // productStock: { select: { branchId: true } },
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
  let deliverSum = 0;
  for (let i = 0; i < productOrder.length; i++) {
    console.log(productOrder[i]);
    productOrderIds.push(productOrder[i].id);
    deliverSum += productOrder[i].subtotal;
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
  const percentage = order[0].productOrder[0].commissionRate;
  await createDepositPayment({
    type: TransactionType.DEPOSIT,
    isUser: false,
    userId: storeId,
    amount: deliverSum * (1 - percentage),
    purpose: "deliver_order",
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Order Status Updated Successfully"),
    data: updatedOrder,
  });
};

const changeOrderStatusAsRefundedByAdmin = async (req, res, next) => {
  const { orderId, storeId } = req.body;
  console.log(storeId);

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
      userId: true,
      productOrder: {
        select: {
          id: true,
          subtotal: true,
          quantity: true,
          deliveryFee: true,
          // productStock: { select: { branchId: true } },
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
  let deliverSum = 0;
  for (let i = 0; i < productOrder.length; i++) {
    console.log(productOrder[i]);
    productOrderIds.push(productOrder[i].id);
    deliverSum += productOrder[i].subtotal + productOrder[i].deliveryFee;
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
            status: OrderStatus.REFUNDED,
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
    isUser: true,
    userId: order[0].userId,
    amount: deliverSum,
    purpose: "refund_order",
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Order Status Updated Successfully"),
    data: updatedOrder,
  });
};

const cancelProductOrderByUser = async (req, res, next) => {
  const { id: productOrderId, cancellationReason } = req.body;
  const zodModel = OrderStatusZodModel.safeParse({
    orderId: productOrderId, //
    status: "cancelled",
    cancellationReason: cancellationReason,
  });

  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  //TODO WHAT IF THE ORDER IS PREPARING OR DELIVERING
  const order = await prisma.productOrder.findUnique({
    where: {
      id: productOrderId,
    },
    include: {
      productStock: {
        select: {
          variant: {
            include: {
              product: { select: { doesNeedPreparation: true } },
            },
          },
          branch: {
            select: {
              storeId: true,
            },
          },
        },
      },
    },
  });
  if (!order) {
    throw new NotFoundError("Order not found");
  }
  const canOrderBeCancelled =
    order.status == OrderStatus.REFUNDED ||
    order.status == OrderStatus.CANCELLED;
  // console.log(canOrderBeCancelled);
  if (canOrderBeCancelled == true) {
    throw new BadRequestError("Order can not be cancelled now");
  }
  let userRefundValue = 0;
  let storeRefundValue = 0;

  if (order.status == OrderStatus.CONFIRMED) {
    if (order.productStock.variant.product.doesNeedPreparation == true) {
      userRefundValue = order.subtotal * 0.9 + order.deliveryFee;
      storeRefundValue = order.subtotal * 0.1;
    } else {
      userRefundValue = order.subtotal + order.deliveryFee;
    }
  } else if (order.status == OrderStatus.PENDING) {
    userRefundValue = order.subtotal + order.deliveryFee;
  } else if (order.status == OrderStatus.SHIPPED) {
    if (order.productStock.variant.product.doesNeedPreparation == true) {
      userRefundValue = order.subtotal * 0.75;
      storeRefundValue = order.subtotal * 0.25;
    } else {
      userRefundValue = order.subtotal * 0.8;
      storeRefundValue = order.subtotal * 0.2;
    }
  } else if (order.status == OrderStatus.DELIVERED) {
    if (order.productStock.variant.product.doesNeedPreparation == true) {
      userRefundValue = 0;
      storeRefundValue = order.subtotal;
    } else {
      userRefundValue = order.subtotal * 0.75;
      storeRefundValue = order.subtotal * 0.25;
    }
  }
  // if (orderStatusListToNotAcceptCancellation.includes(order.status)) {
  //   throw new BadRequestError("Order cannot be cancelled.");
  // }
  // let productOrderIds = [];
  // for (let i = 0; i < order.productOrder.length; i++) {
  //   console.log(order.productOrder[i].id);
  //   productOrderIds.push(order.productOrder[i].id);
  // }
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

  // }
  const percentage = order.commissionRate;
  const orderUpdated = await prisma.productOrder.update({
    where: { id: productOrderId },
    data: {
      cancellationReason: cancellationReason,
      userRefundAmount: userRefundValue,
      storerRefundAmount: storeRefundValue * percentage,
      status: OrderStatus.CANCELLED,
    },
  });
  console.log(orderUpdated);

  await prisma.product.update({
    where: {
      id: order.productStock.variant.productId,
      // {
      //   in: userCart.productCart.map((item) => item.productStock.productId),
      // },
    },
    data: {
      productVariant: {
        update: {
          where: {
            productId_color: {
              productId: order.productStock.variant.productId,
              color: order.productStock.variant.color,
              // branchId: item.branchId,
            },
          },
          data: {
            productStock: {
              update: {
                where: {
                  id: order.productStockId,
                },
                data: { stock: { increment: order.quantity } },
              },
            },
          },
        },
      },
    },
  });
  if (userRefundValue != 0) {
    await createDepositPayment({
      type: TransactionType.DEPOSIT,
      isUser: true,
      userId: req.user.id,
      amount: userRefundValue,
      purpose: "cancel_order",
    });
  }
  if (storeRefundValue != 0) {
    await createDepositPayment({
      type: TransactionType.DEPOSIT,
      isUser: false,
      userId: order.productStock.branch.storeId,
      amount: storeRefundValue * percentage,
      purpose: "cancel_order",
    });
  }
  // if (!order) {
  //   throw new BadRequestError("Order not found.");
  // }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Order Cancelled Successfully"),
  });
};

module.exports = {
  getAllUserOrders,
  getOrder,
  createOrder,
  createPaidOrder,
  deleteUnpaidOrder,
  changeOrderStatusAsDeliveredByAdmin,
  changeOrderStatusAsRefundedByAdmin,
  // updateOrderStatus,
  getAllStoreOrders,
  changeOrderStatusByStore,
  // changeOrderStatusAsCancelledByStore,
  // changeOrderStatusAsShippedByStore,
  cancelProductOrderByUser,
  // changeOrderStatusByStore,
};
