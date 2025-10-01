const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { SupportZodModel } = require("../models/support-zod-model");
const { PlanName } = require("../generated/prisma");

const createSubscription = async (req, res, next) => {
  const { subId, isPermanentSub } = req.body;
  const subIdEnum =
    subId == "diamond"
      ? PlanName.DIAMOND
      : subId == "sliver"
      ? PlanName.SILVER
      : subId == "gold"
      ? PlanName.GOLD
      : subId == "basic"
      ? PlanName.BASIC
      : undefined;
  //subId
  // const currentPeriodEnd = req.user.subscription.currentPeriodEnd;
  // const currentPeriodStart = req.user.subscription.currentPeriodStart;
  // const currentPeriodEndAfterMonth =
  //   currentPeriodEnd != undefined
  //     ? currentPeriodEnd.setMonth(now.getMonth() + 1)
  //     : undefined;
  // const currentPeriodStartMonth = currentPeriodStart.setMonth(
  //   now.getMonth() + 1
  // );

  if (req.user.subscription.planLimit == subIdEnum) {
    throw new BadRequestError("You already have this subscription");
  }
  const planLimit = await prisma.planLimit.findUnique({
    where: { planName: subIdEnum },
  });

  if (!planLimit) {
    throw new BadRequestError("Plan Limit not found");
  }
  if (planLimit.adsPerWeek < req.user.subscription.adsPerWeek) {
    throw new BadRequestError("You have exceeded the ads limit");
  } else if (planLimit.maxProducts < req.user.subscription.maxTotalProducts) {
    throw new BadRequestError("You have exceeded the products limit");
  } else if (planLimit.maxBranches < req.user.subscription.maxBranches) {
    throw new BadRequestError("You have exceeded the branches limit");
  } else if (
    planLimit.maxDiscountCodes < req.user.subscription.maxDiscountCodes
  ) {
    throw new BadRequestError("You have exceeded the discount codes limit");
  }

  // boxes
  // else if(planLimit.notificationsPerWeek > req.user.subscription.notificationsPerWeek){

  // }
  await prisma.store.update({
    where: { id: req.user.id },
    data: {
      subscription: {
        update: {
          planLimit: { connect: { planName: planLimit.planName } },
        },
      },
    },
  });
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Switched to subscription plan successfully",
  });
};

module.exports = {
  createSubscription,
};
