const { DeliveryTaxesZodModel } = require("../models/delivery-taxes-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const getAllDeliveryTaxes = async (req, res, next) => {
  const deliveryTaxes = await prisma.deliveryTaxes.findMany({});
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    count: deliveryTaxes.length,
    data: deliveryTaxes,
  });
};
const getSingleDeliveryTaxes = async (req, res, next) => {
  const { id: deliveryTaxesId } = req.params;
  const deliveryTaxes = await prisma.deliveryTaxes.findUnique({
    where: { id: deliveryTaxesId },
  });
  if (!deliveryTaxes) {
    throw new BadRequestError("Delivery Taxes not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: deliveryTaxes });
};

const createDeliveryTaxes = async (req, res, next) => {
  const { originStateId, destinationStateId, baseFee } = req.body;

  const zodModel = DeliveryTaxesZodModel.safeParse({
    originStateId: originStateId,
    destinationStateId: destinationStateId,
    baseFee: baseFee,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const originState = await prisma.state.findUnique({
    where: { id: originStateId },
  });
  if (!originState) {
    throw new BadRequestError("Origin State not found");
  }
  const destinationState = await prisma.state.findUnique({
    where: { id: destinationStateId },
  });
  if (!destinationState) {
    throw new BadRequestError("destination State not found");
  }

  const createdDeliveryTaxes = await prisma.deliveryTaxes.create({
    data: {
      originStateId: originStateId,
      destinationStateId: destinationStateId,
      baseFee: baseFee,
    },
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ isSuccess: true, data: createdDeliveryTaxes });
};

const updateDeliveryTaxes = async (req, res, next) => {
  const { id } = req.params;
  const { originStateId, destinationStateId, baseFee } = req.body;
  const image = req.files == undefined ? undefined : req.files.image;

  if (!id) {
    throw new BadRequestError("Please send an ID");
  }

  if (originStateId) {
    const originState = await prisma.state.findUnique({
      where: { id: originStateId },
    });
    if (!originState) {
      throw new BadRequestError("Origin State not found");
    }
  }
  if (destinationStateId) {
    const destinationState = await prisma.state.findUnique({
      where: { id: destinationStateId },
    });
    if (!destinationState) {
      throw new BadRequestError("destination State not found");
    }
  }

  const deliveryTaxes = await prisma.deliveryTaxes.update({
    where: { id: id },
    data: {
      originStateId: originStateId || undefined,
      destinationStateId: destinationStateId || undefined,
      baseFee: baseFee || undefined,
    },
  });
  if (!deliveryTaxes) {
    throw new BadRequestError("Delivery Taxes not found");
  }

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: deliveryTaxes });
};

const deleteDeliveryTaxes = async (req, res, next) => {
  const { id: deliveryTaxesId } = req.params;
  const deliveryTaxes = await prisma.deliveryTaxes.delete({
    where: { id: deliveryTaxesId },
  });
  if (!deliveryTaxes) {
    throw new BadRequestError("Delivery Taxes not found");
  }

  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Delivery Taxes deleted successfully" });
};

module.exports = {
  getAllDeliveryTaxes,
  getSingleDeliveryTaxes,
  createDeliveryTaxes,
  updateDeliveryTaxes,
  deleteDeliveryTaxes,
};
