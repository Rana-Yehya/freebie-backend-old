const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");
const { branch, ProductCartStatus } = require("../generated/prisma");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { UserBundleZodModel } = require("../models/user-bundle-zod-model");
const { database } = require("firebase-admin");
// const {
//   UpdateUserProductZodModel,
// } = require("../models/update-user-product-zod-model");

const createUpdateCartBundleItem = async (req, res, next) => {
  const { bundleId, quantity } = req.body;
  const zodModel = UserBundleZodModel.safeParse({
    bundleId: bundleId,
    quantity: quantity,
  });

  // console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const bundle = await prisma.bundle.findUnique({
    where: { id: bundleId },
    include: {
      bundleItems: {
        include: {
          productVariant: {
            include: {
              product: {
                select: {
                  doesNeedPreparation: true,
                  canBeDeliveredOutsideState: true,
                },
              },
              productStock: {
                include: {
                  branch: {
                    include: {
                      location: true,
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
  if (!bundle) {
    throw new NotFoundError("Bundle not found");
  }

  // checking the quantity
  // TODO check with multiple branches
  const bundleItems = bundle.bundleItems.map((element) => element);
  // let branchIds = new Set();
  let productVariant = [];
  let branchesList = []; //: branch[]
  let stateIdsMapJson = new Map();
  for (let j = 0; j < bundleItems.length; j++) {
    const bundleItem = bundleItems[j];

    const productStock = bundleItem.productVariant.productStock;
    // console.log("Before");
    // console.log(`productVariant[${j}] ${bundleItem.productVariant.id}`);
    // console.log(
    //   `productVariant[${j}.productStock.length] ${bundleItem.productVariant.productStock.length}`
    // );
    for (let index = 0; index < productStock.length; index++) {
      const productStockBranch = productStock[index];

      if (
        bundleItem.productVariant.product.canBeDeliveredOutsideState == false &&
        productStock[index].branchId != req.user.mainUserLocations.stateId
      ) {
        console.log("not avaialble in the state");

        // productVariant = productVariant[j].productStock.reduce(
        //   productVariant[j].productStock[index]
        // );
        // branchIds.add(productStockBranch.branchId);
      } else if (
        productStockBranch.stock < quantity * bundleItem.quantity &&
        !bundleItem.productVariant.product.doesNeedPreparation
      ) {
        console.log("stock not enough");
      } else {
        // productVariant.push(bundleItem.productVariant);
        // branchesList.push(
        //   bundleItem.productVariant.productStock[index].branchId
        // );
        stateIdsMapJson[
          bundleItem.productVariant.productStock[index].branch.location.stateId
        ] =
          (stateIdsMapJson[
            bundleItem.productVariant.productStock[index].branch.location
              .stateId
          ] || 0) + 1;
      }
    }
    // console.log("After");
    // console.log(`productVariant[${j}] ${productVariant}`);
    // console.log(
    //   `productVariant[${j}.productStock.length] ${productVariant.length}`
    // );
  }

  const stateIds = [];
  const stateIdsMap = new Map(Object.entries(stateIdsMapJson));
  stateIdsMap.forEach((value, key) => {
    if (value >= bundleItems.length) {
      stateIds.push(key);
    }
  });
  const deliveryStates = await prisma.deliveryTaxes.findFirst({
    where: {
      originStateId: {
        in: stateIds,
      },
      destinationStateId: req.user.mainUserLocations.stateId,
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

  const createdOrUpdatedUserCart = await prisma.userCart.upsert({
    where: { userId: req.user.id },
    update: {
      // user: {},
      bundleCart: {
        upsert: {
          create: {
            bundle: { connect: { id: bundleId } },
            quantity: quantity,
            deliveryTaxes: { connect: { id: deliveryStates.id } },
            status: ProductCartStatus.ACTIVE,
          },
          where: {
            userCartUserId_bundleId: {
              userCartUserId: req.user.id,
              bundleId: bundleId,
            },
          },
          update: {
            quantity: quantity,
            deliveryTaxes: { connect: { id: deliveryStates.id } },
            status: ProductCartStatus.ACTIVE,
          },
        },
      },
    },
    create: {
      user: { connect: { id: req.user.id } },
      bundleCart: {
        create: {
          status: ProductCartStatus.ACTIVE,
          bundle: { connect: { id: bundleId } },
          // userCart: { connect: { userId: req.user.id } },
          quantity: quantity,
          deliveryTaxes: { connect: { id: deliveryStates.id } },
        },
      },
    },
  });

  // console.log(deliveryStates);
  // if (!deliveryStates) {
  //   throw new NotFoundError("No delivery state found");
  // }
  // if (bundleItems.length != productVariant.length) {
  //   throw new BadRequestError("Can not find enough products");
  // }
  // for (let index = 0; index < productVariant.length; index++) {
  //   const element = productVariant[index];
  //   console.log(index);

  //   console.log(element);
  // }
  // for (let i = 0; i < productStocks.length; i++) {
  //   const bundleItem = productStocks[i].at(0).;
  //   const productVariant = bundleItem.productVariant;
  //   const productStock = productVariant.productStock;
  //   if (productStock. < quantity * bundleItem.quantity) {
  //     throw new BadRequestError(`Some or all items are out of stock`);
  //   } else {
  //     // productStock.map((element)=> element.)
  //   }
  // }
  // let statesIds = [];

  // if (
  //   productVariant.product.canBeDeliveredOutsideState == false &&
  //   !statesIds.includes(req.user.stateId)
  // ) {
  //   throw new BadRequestError(
  //     "You can't purchase this item outside of your state"
  //   );
  // }
  // let coloredProductStock = [];
  // // productVariants.map((element) => {
  // if (!productVariant.product.doesNeedPreparation) {
  //   productVariant.productStock.map((stock) => {
  //     stock.stock >= quantity ? coloredProductStock.push(stock) : undefined;
  //   });
  // } else {
  //   coloredProductStock.push(productVariants.productStock);
  // }
  // const deliveryStates = await prisma.deliveryTaxes.findFirst({
  //   where: {
  //     originStateId: {
  //       in: coloredProductStock.map(
  //         (element) => element.branch.location.stateId
  //       ),
  //     },
  //     destinationStateId: req.user.stateId,
  //   },
  //   select: {
  //     id: true,
  //     originStateId: true,
  //     // baseFee: true,
  //     destinationStateId: true,
  //   },
  //   orderBy: {
  //     baseFee: "desc",
  //   },
  // });

  // // console.log(deliveryStates);
  // if (!deliveryStates) {
  //   throw new NotFoundError("No delivery state found");
  // }
  // let productStock = [];
  // for (let i = 0; i < coloredProductStock.length; i++) {
  //   const element = coloredProductStock[i];
  //   console.log(element.branch.location.stateId);
  //   console.log(deliveryStates.originStateId);
  //   const found =
  //     element.branch.location.stateId == deliveryStates.originStateId;
  //   if (found) {
  //     productStock.push(element);
  //     break;
  //   }
  // }
  // console.log(productStock);
  // console.log("userCart", req.user.id);
  // console.log("productStock", productStock[0].id);
  // const createdOrUpdatedUserCart = await prisma.userCart.upsert({
  //   where: { userId: req.user.id },
  //   update: {
  //     // user: {},
  //     productCart: {
  //       upsert: {
  //         create: {
  //           productStock: { connect: { id: productStock[0].id } },
  //           quantity: quantity,
  //           deliveryTaxes: { connect: { id: deliveryStates.id } },
  //           status: ProductCartStatus.ACTIVE,
  //         },
  //         where: {
  //           userCartUserId_productStockId: {
  //             userCartUserId: req.user.id,
  //             productStockId: productStock[0].id,
  //           },
  //         },
  //         update: {
  //           quantity: quantity,
  //           deliveryTaxes: { connect: { id: deliveryStates.id } },
  //           status: ProductCartStatus.ACTIVE,
  //         },
  //       },
  //       // connectOrCreate: {
  //       //   where: {
  //       //     userCartUserId_productStockId: {
  //       //       userCartUserId: req.user.id,
  //       //       productStockId: productStock[0].id,
  //       //     },
  //       //   },
  //       //   create: {
  //       //     productStock: { connect: { id: productStock[0].id } },
  //       //     quantity: quantity,
  //       //     deliveryTaxes: { connect: { id: deliveryStates.id } },
  //       //     status: ProductCartStatus.ACTIVE,
  //       //   },
  //       // },
  //       // update: {
  //       //   where: {
  //       //     userCartUserId_productStockId: {
  //       //       userCartUserId: req.user.id,
  //       //       productStockId: productStock[0].id,
  //       //     },
  //       //   },
  //       //   data: {
  //       //     status: ProductCartStatus.ACTIVE,
  //       //     quantity: quantity,
  //       //     deliveryTaxes: { connect: { id: deliveryStates.id } },
  //       //   },
  //       // },
  //       // create: {
  //       //   productStock: { connect: { id: productStock[0].id } },
  //       //   quantity: quantity,
  //       //   deliveryTaxes: { connect: { id: deliveryStates.id } },
  //       //   status: ProductCartStatus.ACTIVE,
  //       // },
  //     },
  //   },
  //   create: {
  //     user: { connect: { id: req.user.id } },
  //     productCart: {
  //       // connectOrCreate: {
  //       //   where: {
  //       //     userCartUserId_productStockId: {
  //       //       userCartUserId: req.user.id,
  //       //       productStockId: productStock[0].id,
  //       //     },
  //       //   },
  //       //   create: {
  //       //     status: ProductCartStatus.ACTIVE,
  //       //     productStock: { connect: { id: productStock[0].id } },
  //       //     // userCart: { connect: { userId: req.user.id } },
  //       //     quantity: quantity,
  //       //     deliveryTaxes: { connect: { id: deliveryStates.id } },
  //       //   },
  //       // },
  //       create: {
  //         status: ProductCartStatus.ACTIVE,
  //         productStock: { connect: { id: productStock[0].id } },
  //         // userCart: { connect: { userId: req.user.id } },
  //         quantity: quantity,
  //         deliveryTaxes: { connect: { id: deliveryStates.id } },
  //       },
  //     },
  //   },
  // });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Added to cart successfully"),
    // productVariant,
    // // bundleItems,
    // // userLocations: req.user.mainUserLocations,
    // branchesList,
    // stateIdsMap,
    // deliveryStates,
    // stateIds,
    data: createdOrUpdatedUserCart,
    // branchesListSet: new Set(branchesList),
    // data: createdOrUpdatedUserCart
  });
};

const deleteCartBundleItem = async (req, res, next) => {
  // const { productId: productId, color: color } = req.query;
  const bundleId = req.params.id;
  if (!bundleId) {
    throw new BadRequestError("Please enter a bundle id");
  }
  // console.log(productId, color, userCartId);
  await prisma.bundleCart.delete({
    where: {
      userCartUserId_bundleId: {
        bundleId: bundleId,
        userCartUserId: req.user.id,
      },
      //AND: [{ id: req.user.id }, { productStockId: productStockId }],
    },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "User Cart Item deleted successfully",
    // productVariant,
  });
};

module.exports = {
  deleteCartBundleItem,
  createUpdateCartBundleItem,
  // updateCartQuantity,
};
