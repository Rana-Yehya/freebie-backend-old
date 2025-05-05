const { OccasionZodModel } = require("../models/occasion-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const getAllOccasions = async (req, res, next) => {
  const occasion = await prisma.occasion.findMany();
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: occasion.length, data: occasion });
};
const getOccasion = async (req, res, next) => {
  const { id: occasionId } = req.params;
  const occasion = await prisma.occasion.findUnique({
    where: { id: occasionId },
  });
  if (!occasion) {
    throw new BadRequestError("Occasion not found");
  }
  return res.status(StatusCodes.OK).json({ isSuccess: true, data: occasion });
};

const createOccasion = async (req, res, next) => {
  const { name, image } = req.body;
  const zodModel = OccasionZodModel.safeParse({
    name: name,
    image: image,
  });

  console.log(zodModel);
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const createdOccasion = await prisma.occasion.create({
    data: {
      name: name,
      image: image,
    },
  });
  console.log(createdOccasion);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdOccasion });
};

const updateOccasion = async (req, res, next) => {
  const { id } = req.params;
  const { name, image } = req.body;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }
  const updatedOccasion = await prisma.occasion.update({
    where: { id: id },
    data: {
      name: name || undefined,
      image: image || undefined,
    },
  });
  console.log(updatedOccasion);

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: updatedOccasion });
};

const deleteOccasion = async (req, res, next) => {
  const { id: OccasionId } = req.params;
  const occasion = await prisma.occasion.delete({
    where: { id: OccasionId },
  });
  if (!occasion) {
    throw new BadRequestError("Occasion not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Occasion deleted successfully" });
};

module.exports = {
  getAllOccasions,
  getOccasion,
  createOccasion,
  updateOccasion,
  deleteOccasion,
};
