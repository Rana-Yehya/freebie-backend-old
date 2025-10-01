const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const {
  CreatePlanLimitZodModel,
} = require("../models/create-plan-limit-zod-model");
const { PlanName } = require("../generated/prisma");
const getAllPlanLimits = async (req, res, next) => {
  const planLimits = await prisma.planLimit.findMany({});
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, count: planLimits.length, data: planLimits });
};
const createUpdatePlanLimit = async (req, res, next) => {
  const {
    planName,
    maxProducts,
    maxBranches,
    maxDiscountCodes,
    notificationsPerWeek,
    adsPerWeek,
    allowsBoxes,
    allowsCollaborations,
    commissionRate,
  } = req.body;
  const zodModel = CreatePlanLimitZodModel.safeParse({
    planName: planName,
    maxProducts: maxProducts,
    maxBranches: maxBranches,
    maxDiscountCodes: maxDiscountCodes,
    notificationsPerWeek: notificationsPerWeek,
    adsPerWeek: adsPerWeek,
    allowsBoxes: allowsBoxes,
    allowsCollaborations: allowsCollaborations,
    commissionRate: commissionRate,
  });
  if (!zodModel.success) {
    throw new BadRequestError(zodModel.error.errors[0].message);
  }
  const planNameEnum =
    planName == "diamond"
      ? PlanName.DIAMOND
      : planName == "sliver"
      ? PlanName.SILVER
      : planName == "gold"
      ? PlanName.GOLD
      : planName == "basic"
      ? PlanName.BASIC
      : undefined;

  const planLimit = await prisma.planLimit.upsert({
    where: { planName: planNameEnum },
    update: {
      // planName: planName,
      maxProducts: maxProducts,
      maxBranches: maxBranches,
      maxDiscountCodes: maxDiscountCodes,
      notificationsPerWeek: notificationsPerWeek,
      adsPerWeek: adsPerWeek,
      allowsBoxes: allowsBoxes,
      allowsCollaborations: allowsCollaborations,
      commissionRate:
        commissionRate != undefined ? commissionRate / 100 : undefined,
    },
    create: {
      planName: planNameEnum,
      maxProducts: maxProducts,
      maxBranches: maxBranches,
      maxDiscountCodes: maxDiscountCodes,
      notificationsPerWeek: notificationsPerWeek,
      adsPerWeek: adsPerWeek,
      allowsBoxes: allowsBoxes,
      allowsCollaborations: allowsCollaborations,
      commissionRate:
        commissionRate != undefined ? commissionRate / 100 : undefined,
    },
  });

  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    message: "Plan Limit sent successfully",
    planLimit: planLimit,
  });
};

const deletePlanLimit = async (req, res, next) => {
  const { id: planName } = req.params;
  const planNameEnum =
    planName == "diamond"
      ? PlanName.DIAMOND
      : planName == "sliver"
      ? PlanName.SILVER
      : planName == "gold"
      ? PlanName.GOLD
      : planName == "basic"
      ? PlanName.BASIC
      : undefined;
  if (planNameEnum == undefined) {
    throw new BadRequestError("Please enter a valid plan name");
  }
  const planLimit = await prisma.planLimit.delete({
    where: { planName: planNameEnum },
  });
  if (!planLimit) {
    throw new NotFoundError("Plan Limit not found");
  }
  return res
    .status(StatusCodes.OK)
    .json({ isSuccess: true, message: "Plan Limit deleted successfully" });
};

module.exports = {
  createUpdatePlanLimit,
  deletePlanLimit,
  getAllPlanLimits,
};
