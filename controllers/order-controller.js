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
const { connect } = require("../routes/country-route");

//for now create a function for each status
const OrderStatus = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

//pending, confirmed, shipped, delivered, cancelled, refunded
const getAllUserOrders = async (req, res, next) => {
  const userOrder = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: {
      productOrder: {
        include: {
          productStock: {
            include: {
              product: {
                select: { name: true, image: true },
              },
            },
          },
          // branch: true,
        },
      },
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
      location: true,
      productOrder: {
        include: {
          orderId: false,
          productStock: {
            include: {
              product: {
                select: { id: true, name: true, image: true },
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
    where: { userId: req.user.id },
    include: {
      productCart: {
        select: {
          productStockId: true,
          productStock: {
            select: {
              productId: true,
              product: {
                select: {
                  price: true,
                  productPrice: true,
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
      price: item.productStock.product.productPrice
        ? item.productStock.product.productPrice.actualPrice
        : item.productStock.product.price,
      // productStock: { connect: { id: item.productStockId } },
      productStockId: item.productStockId,
    };

    //     {
    //   productId: item.productId,
    //   branchId: item.branchId,
    //   //TODO IS IT CORRECT
    //   price: item.product.actualPrice || item.product.price, //for one item
    //   // storeId: item.branch.storeId,
    //   color: item.color,
    //   quantity: item.quantity,
    // };
  });
  console.log(userCart.productCart);
  console.log(productOrder);
  console.log(productOrder.productStock);

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
    throw new BadRequestError("Order was not created. Please contact support.");
  }
  const productCart = userCart.productCart.map((item) => {
    return {
      data: { isDeleted: true },
      where: {
        userCartUserId: req.user.id,
        productStockId: item.productStockId,
      },
    };
  });
  /*
   productCart: {
        updateMany: {
          data: { isDeleted: true },
          where: {
            userCartUserId_productStockId: productCart,
          },
        },
      },
*/
  await prisma.userCart.update({
    where: {
      userId: req.user.id,
    },
    data: {
      productCart: {
        updateMany: productCart,

        // userCart.productCart.map(
        //       (item) =>  {
        //   data: { isDeleted: true },
        //   where: {
        //     userCartUserId: req.user.id,
        //     productStockId: item.productStockId
        //    }
        //    }
        //  )
      },
    },
  });
  userCart.productCart.map(async (item) => {
    await prisma.product.update({
      where: {
        id: item.productStock.productId,
        // {
        //   in: userCart.productCart.map((item) => item.productStock.productId),
        // },
      },
      data: {
        productStock: {
          update: {
            where: {
              productId_branchId_color: {
                productId: item.productId,
                color: item.color,
                branchId: item.branchId,
              },
            },
            data: { stock: { decrement: item.quantity } },
          },
        },
      },
    });
  });
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
            every: { productStock: { branch: { storeId: req.user.id } } },
          },
        },
        { productOrder: { every: { status: "pending" } } },
      ],
    },
    select: {
      productOrder: {
        id: true,
        select: {
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

  // let productOrderBranches = [];
  // order[0].productOrder.map((product) => {
  //   productOrderBranches.push(product.branchId);
  // });
  // console.log(productOrderBranches);

  // //TODO this is wrong
  // // const generalStatus = productOrder.length == 1 ? "confirmed" : "pending";

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      //      status: generalStatus,
      productOrder: {
        update: {
          // where: {
          //   branchId: { in: productOrderBranches },
          // },
          where: {
            productStock: { branch: { storeId: req.user.id } },
          },
          data: {
            status: "confirmed",
          },
        },
      },
      // branch: {
      //   storeId: req.user.id,
      //
      //     },
      //     data: {
      //       status: "confirmed",
      //     },
      //   },
      //   // branch: {
      //   //   storeId: req.user.id,
      //   // },
      // },
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
            every: { productStock: { branch: { storeId: req.user.id } } },
          },
        },
        { productOrder: { every: { status: "pending" } } },
      ],
    },
    select: {
      productOrder: {
        id: true,
        select: {
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

  if (order.length == 0) {
    throw new BadRequestError(
      "The order is confirmed or you already confirmed it"
    );
  }
  // const productOrder = order.productOrder.filter(
  //   (product) => product.status === "cancelled"
  // );
  // // const stores = order.productOrder.map((product) => product.branch.storeId);

  // // console.log(productOrder.length);
  // // if (productOrder.length == 1) {
  // //   throw new Error("You can't cancel this order");
  // // }
  // // const generalStatus = productOrder.length == 1 ? "confirmed" : "pending";
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
  //       product.status === "cancelled" || product.status !== "pending"
  //   )
  // ) {
  //   throw new BadRequestError(
  //     "The order is cancelled or you already confirmed it"
  //   );
  // }

  // let productOrderBranches = [];
  // order[0].productOrder.map((product) => {
  //   productOrderBranches.push(product.branchId);
  // });
  // console.log(productOrderBranches);
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      //      status: generalStatus,
      productOrder: {
        update: {
          // where: {
          //   branchId: { in: productOrderBranches },
          // },
          where: {
            productStock: { branch: { storeId: req.user.id } },
          },
          data: {
            status: "cancelled",
          },
        },
      },
    },
    // include: {
    //   productOrder: {
    //     include: {
    //       product: {
    //         include: true,
    //       },
    //       branch: {
    //         include: {
    //           store: true,
    //         },
    //       },
    //     },
    //   },
    // },
  });
  console.log(productOrder.length + 1);
  if (order[0].productOrder.length == productOrder.length + 1) {
    let sum = 0;
    productOrderList.map((product) => {
      sum = sum + product.price * product.quantity;
    });
    await createDepositPayment({
      isUser: true,
      userId: order[0].userId,
      amount: sum + order[0].deliveryFee,
      purpose: "cancel_order",
    });
  } else {
    let sum = 0;
    productOrderList.map((product) => {
      sum = sum + product.price * product.quantity;
    });
    await createDepositPayment({
      isUser: true,
      userId: order[0].userId,
      amount: sum,
      purpose: "cancel_order",
    });
  }
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
        { productOrder: { every: { branch: { storeId: req.user.id } } } },
        { productOrder: { every: { status: "confirmed" } } },
      ],
    },
    select: {
      status: true,
      productOrder: {
        select: {
          price: true,
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
      "Order has not been confirmed or it is already shipped"
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

  let productOrderBranches = [];
  order[0].productOrder.map((product) => {
    productOrderBranches.push(product.branchId);
  });
  console.log(productOrderBranches);
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      // status: generalStatus,
      productOrder: {
        updateMany: {
          where: {
            branchId: { in: productOrderBranches },
          },
          data: {
            status: "shipped",
          },
        },
        // branch: {
        //   storeId: req.user.id,
        // },
      },
    },
  });
  let sum = 0;
  order[0].productOrder.map((product) => {
    sum = sum + product.price * product.quantity;
  });

  await createDepositPayment({
    isUser: false,
    userId: req.user.id,
    amount: sum - sum * 0.2,
    purpose: "order_shipped",
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Order Status Updated Successfully",
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
        { productOrder: { every: { branch: { storeId: storeId } } } },
        { productOrder: { every: { status: "shipped" } } },
      ],
    },
    select: {
      status: true,
      productOrder: {
        select: {
          price: true,
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
      "Order has not been delivered or it is not shipped yet"
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

  let productOrderBranches = [];
  order[0].productOrder.map((product) => {
    productOrderBranches.push(product.branchId);
  });
  console.log(productOrderBranches);
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      // status: generalStatus,
      productOrder: {
        updateMany: {
          where: {
            branchId: { in: productOrderBranches },
          },
          data: {
            status: "delivered",
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
  //TODO WHAT IF THE ORDER IS PREPARING OR DELIVERING
  const order = await prisma.order.findMany({
    where: {
      AND: [
        { id: orderId },
        // { productOrder: { every: { branch: { storeId: req.user.id } } } },
        {
          productOrder: {
            every: {
              status: "shipped" || "delivered" || "cancelled" || "refunded",
            },
          },
        },
      ],
    },
    select: {
      status: true,
      totalAmount: true,
      productOrder: {
        select: {
          product: {
            select: {
              doesNeedPreparation: true,
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

  if (order.length == 0) {
    throw new BadRequestError("Order can not be cancelled now.");
  }
  // const orderStatusListToNotAcceptCancellation = [
  //   "shipped",
  //   "delivered",
  //   "cancelled",
  //   "refunded",
  // ];
  // if (orderStatusListToNotAcceptCancellation.includes(order.status)) {
  //   throw new BadRequestError("Order cannot be cancelled.");
  // }
  const doesNeedPreparation = order[0].productOrder.map(
    (p) => p.product.doesNeedPreparation
  );
  console.log(doesNeedPreparation);
  if (doesNeedPreparation.includes(true)) {
    await createDepositPayment({
      isUser: true,
      userId: req.user.id,
      amount: order.totalAmount - order.totalAmount * 0.2,
      purpose: "cancel_order",
    });
    //TODO what if a lot of stores are preparing
    // createDepositPayment({
    //   isUser: true,
    //   userId: req.user.id,
    //   amount: order.totalAmount - order.totalAmount * 0.8,
    //   purpose: "cancel_order",
    // });
  } else {
    await createDepositPayment({
      isUser: true,
      userId: req.user.id,
      amount: order.totalAmount,
      purpose: "cancel_order",
    });
  }
  const orderUpdated = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "cancelled",
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
