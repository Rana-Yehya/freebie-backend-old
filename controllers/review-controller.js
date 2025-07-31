const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { uploadImage } = require("../helpers/cloudinary/upload-image");
const { destroyImage } = require("../helpers/cloudinary/delete-image");
const { ReviewZodModel } = require("../models/review-zod-model");
const { OrderStatus } = require("../generated/prisma");
const getAllProductReviews = async (req, res, next) => {
  const reviews = await prisma.review.findMany({
    where: { productId: req.params.id },
    select: {
      comment: true,
      stars: true,
      user: {
        select: {
          id: true,
          // image: true,
          name: true,
        },
      },
      userId: {},
      createdAt: true,
      updatedAt: true,
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
  const zodModel = ReviewZodModel.safeParse({
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
  const createdReview = await prisma.review.create({
    data: {
      stars: stars,
      comment: comment,
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

const updateReview = async (req, res, next) => {
  const { id: productId } = req.params;
  const { stars, comment } = req.body;

  if (!productId) {
    throw new BadRequestError("Please send a review ID");
  }
  const zodModel = ReviewZodModel.safeParse({
    stars: stars,
    comment: comment,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const updatedReview = await prisma.review.update({
    where: { userId: req.user.id, productId: productId },
    data: {
      stars: stars || undefined,
      comment: comment || undefined,
    },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Review updated successfully",
    data: updatedReview,
  });
};

const deleteReview = async (req, res, next) => {
  const { id: productId } = req.params;
  const review = await prisma.review.delete({
    where: { userId: req.user.id, productId: productId },
  });
  if (!review) {
    throw new BadRequestError("Review not found");
  }

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Review deleted successfully" });
};

module.exports = {
  getAllProductReviews,
  createReview,
  updateReview,
  deleteReview,
};
