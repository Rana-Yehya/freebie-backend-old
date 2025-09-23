const {
  CreateDeliveryTaxesZodModel,
} = require("../models/create-delivery-taxes-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const {
  UpdateDeliveryTaxesZodModel,
} = require("../models/update-delivery-taxes-zod-model");

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
  if (!deliveryTaxesId) {
    throw new BadRequestError("Please enter a delivery taxes id");
  }
  const deliveryTaxes = await prisma.deliveryTaxes.findUnique({
    where: { id: deliveryTaxesId },
  });
  if (!deliveryTaxes) {
    throw new NotFoundError("Delivery Taxes not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, data: deliveryTaxes });
};

const createDeliveryTaxes = async (req, res, next) => {
  const {
    originStateId,
    destinationStateId,
    baseFee,
    additionalFeesAfterKg,
    feePerKg,
  } = req.body;

  const zodModel = CreateDeliveryTaxesZodModel.safeParse({
    originStateId: originStateId,
    destinationStateId: destinationStateId,
    baseFee: baseFee,
    additionalFeesAfterKg: additionalFeesAfterKg,
    feePerKg: feePerKg,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const createdDeliveryTaxes = await prisma.deliveryTaxes.create({
    data: {
      originState: { connect: { id: originStateId } },
      destinationState: { connect: { id: destinationStateId } },
      baseFee: baseFee,
      additionalFeesAfterKg: additionalFeesAfterKg,
      feePerKg: feePerKg,
    },
  });

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: i18n.__("Delivery Taxes created successfully"),
    data: createdDeliveryTaxes,
  });
};

const updateDeliveryTaxes = async (req, res, next) => {
  const { id } = req.params;
  const {
    originStateId,
    destinationStateId,
    baseFee,
    additionalFeesAfterKg,
    feePerKg,
  } = req.body;
  const zodModel = UpdateDeliveryTaxesZodModel.safeParse({
    id: id,
    originStateId: originStateId,
    destinationStateId: destinationStateId,
    baseFee: baseFee,
    additionalFeesAfterKg: additionalFeesAfterKg,
    feePerKg: feePerKg,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }

  const deliveryTaxes = await prisma.deliveryTaxes.update({
    where: { id: id },
    data: {
      originState:
        originStateId != undefined ? { connect: { id: originStateId } } : {},
      // { connect: { id: originStateId || undefined } },
      destinationState:
        destinationStateId != undefined
          ? { connect: { id: destinationStateId } }
          : {},
      //{ connect: { id: destinationStateId || undefined } },
      baseFee: baseFee || undefined,
      additionalFeesAfterKg: additionalFeesAfterKg || undefined,
      feePerKg: feePerKg || undefined,
    },
  });
  if (!deliveryTaxes) {
    throw new NotFoundError("Delivery Taxes not found");
  }

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: i18n.__("Delivery Taxes updated successfully"),
    data: deliveryTaxes,
  });
};

const deleteDeliveryTaxes = async (req, res, next) => {
  const { id: deliveryTaxesId } = req.params;
  if (!deliveryTaxesId) {
    throw new BadRequestError("Please enter a delivery taxes id");
  }
  const deliveryTaxes = await prisma.deliveryTaxes.delete({
    where: { id: deliveryTaxesId },
  });
  if (!deliveryTaxes) {
    throw new NotFoundError("Delivery Taxes not found");
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
