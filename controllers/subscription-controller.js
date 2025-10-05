const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { SupportZodModel } = require("../models/support-zod-model");
const { PlanName, ChangeType } = require("../generated/prisma");
const { storeSubscriptionQueue } = require("../helpers/cron/add-job-to-bullmq");

const createSubscription = async (req, res, next) => {
  const { subId } = req.body;
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
  if (!subIdEnum) {
    throw new BadRequestError("Invalid Subscription Plan");
  }

  const date = new Date();

  if (req.user.subscription.planLimitId == subIdEnum) {
    throw new BadRequestError("You already have this subscription");
  }

  if (req.user.subscription.lastChangeSubscriptionDate >= new Date()) {
    throw new BadRequestError(
      `You can't change subscription in ${new Date(
        req.user.subscription.lastChangeSubscriptionDate - date
      ).getDate()} day(s)`
    );
  }
  let changeType;
  if (subIdEnum == PlanName.BASIC) {
    changeType = ChangeType.DOWNGRADE;
  } else if (
    subIdEnum == PlanName.SILVER &&
    req.user.subscription.planLimitId == PlanName.BASIC
  ) {
    changeType = ChangeType.UPGRADE;
  } else if (
    subIdEnum == PlanName.GOLD &&
    req.user.subscription.planLimitId != PlanName.DIAMOND
  ) {
    changeType = ChangeType.UPGRADE;
  } else {
    changeType = ChangeType.UPGRADE;
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

  const updatedSub = await prisma.store.update({
    where: { id: req.user.id },
    data: {
      subscription: {
        update: {
          planLimit: {
            connect: {
              planName: planLimit.planName,
            },
          },
          lastChangeSubscriptionDate: new Date(
            new Date(date).setDate(date.getDate() + 7)
          ),
          periodEnd: new Date(new Date(date).setMonth(date.getMonth() + 1)),
          maxDiscountCodes: 0,
          notificationsPerWeek: 0,
          adsPerWeek: 0,
          planChanges: {
            create: {
              changeType: changeType,
              fromPlan: req.user.subscription.planLimitId,
              toPlan: subIdEnum,
              discountCodesUsedThisPeriod:
                req.user.subscription.maxDiscountCodes,
              notificationsUsedThisPeriod:
                req.user.subscription.notificationsPerWeek,
              adsUsedThisPeriod: req.user.subscription.adsPerWeek,
              commissionRateUsedThisPeriod:
                req.user.subscription.commissionRate,
            },
          },
        },
      },
    },
    include: {
      subscription: true,
    },
  });
  if (updatedSub) {
    await storeSubscriptionQueue({
      storeId: req.user.id,
      // delay: new Date(new Date(date).setMinutes(date.getMinutes() + 1)),
      delay: updatedSub.subscription.periodEnd,
      // delay: new Date().setMonth(new Date().getMonth() + 1),
    });
  }
  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    message: "Switched to subscription plan successfully",
    user: updatedSub,
  });
};

const getSubscriptionHistory = async (req, res, next) => {
  const subscriptionPlanChange = await prisma.subscriptionPlanChange.findMany({
    where: { subscription: { store: { every: { id: req.user.id } } } },
  });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    count: subscriptionPlanChange.length,
    data: subscriptionPlanChange,
  });
};
module.exports = {
  createSubscription,
  getSubscriptionHistory,
};
