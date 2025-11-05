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

const createUpdateCartProductItem = async (req, res, next) => {
  const { productVariantId, quantity } = req.body;
  const zodModel = UserProductZodModel.safeParse({
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
  console.log(productVariant);
  let statesIds = [];
  // if (productVariants.length == undefined) {
  //&& productVariants != undefined
  productVariant.productStock.map((stock) => {
    // console.log(stock);
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
  let productStock = [];
  // productVariants.map((element) => {
  if (!productVariant.product.doesNeedPreparation) {
    productVariant.productStock.map((stock) => {
      stock.stock >= quantity ? productStock.push(stock) : undefined;
    });
  } else {
    productStock.push(productVariant.productStock);
  }
  const deliveryStates = await prisma.deliveryTaxes.findFirst({
    where: {
      originStateId: {
        in: productStock.map((element) => element.branch.location.stateId),
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
  let foundProductStock = [];
  for (let i = 0; i < productStock.length; i++) {
    const element = productStock[i];
    console.log(element.branch.location.stateId);
    console.log(deliveryStates.originStateId);
    const found =
      element.branch.location.stateId == deliveryStates.originStateId;
    if (found) {
      foundProductStock.push(element);
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
            productStock: { connect: { id: foundProductStock[0].id } },
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

const deleteCartProductItem = async (req, res, next) => {
  // const { productId: productId, color: color } = req.query;
  const { id: productStockId } = req.params;
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

module.exports = {
  deleteCartProductItem,
  createUpdateCartProductItem,
  // updateCartQuantity,
};
