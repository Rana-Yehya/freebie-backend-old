const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { uploadImage } = require("../helpers/image-kit/upload-image");
const { destroyImage } = require("../helpers/image-kit/delete-image");
const { CreateReviewZodModel } = require("../models/create-review-zod-model");
const { OrderStatus } = require("../generated/prisma");
const getAllProductReviews = async (req, res, next) => {
  const { id: productId } = req.params;
  if (!productId) {
    throw new BadRequestError("Please send a product id");
  }
  const reviews = await prisma.review.findMany({
    where: { productId: productId },
    include: {
      user: {
        select: {
          id: true,
          // image: true,
          name: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        userId: req.user != undefined ? req.user.id || undefined : undefined,
        //equals: sort: "desc", // This puts the user's review first
      },
    ],
  });
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: reviews.length, data: reviews });
};

const createReview = async (req, res, next) => {
  const { stars, comment } = req.body;
  const { id: productId } = req.params;
  const zodModel = CreateReviewZodModel.safeParse({
    productId: productId,
    stars: stars,
    comment: comment,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const order = await prisma.order.findFirst({
    where: {
      AND: [
        { userId: req.user.id },
        {
          productOrder: {
            every: {
              variant: { productId: productId },
              status: OrderStatus.DELIVERED,
            },
          },
        },
      ],
    },
    // where: {
    //   userId: req.user.id,
    // },
    select: {
      id: true,
      // productOrder: {
      //   select: {
      //     productId: true,
      //   },
      // },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  if (order === null) {
    throw new BadRequestError("You can't review this product");
  }
  /*
922ca900-a832-4dea-a255-d7b60daa31f9
*/
  const createdReview = await prisma.review.upsert({
    where: { userId_productId: { userId: req.user.id, productId: productId } },
    update: {
      stars: stars || undefined,
      comment: comment || undefined,
      // userId: req.user.id,
      //productId: productId,
    },
    create: {
      stars: stars || undefined,
      comment: comment || undefined,
      userId: req.user.id,
      productId: productId,
    },
  });
  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Review created successfully",
    data: createdReview,
  });
};

const deleteReview = async (req, res, next) => {
  const { id: productId } = req.params;
  if (!productId) {
    throw new BadRequestError("Please send a review ID");
  }
  const review = await prisma.review.delete({
    where: { userId_productId: { userId: req.user.id, productId: productId } },
  });
  if (!review) {
    throw new NotFoundError("Review not found");
  }

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Review deleted successfully" });
};

module.exports = {
  getAllProductReviews,
  createReview,
  deleteReview,
};
