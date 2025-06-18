const { CountryZodModel } = require("../models/country-zod-model");
const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { userConstant, adminConstant } = require("../config/constants");
const createDepositPayment = async ({
  isUser = true,
  userId,
  amount,
  purpose,
  currency,
}) => {
  console.log({ userId, amount, purpose, currency });
  const transactionModel =
    isUser == true
      ? {
          type: "deposit",
          amount: amount,
          userId: userId,
          purpose: purpose || undefined,
          currency: currency || undefined,
        }
      : {
          type: "deposit",
          amount: amount,
          storeId: userId,
          purpose: purpose || undefined,
          currency: currency || undefined,
        };
  const transaction = await prisma.transaction.create({
    data: transactionModel,
  });
  if (isUser == true) {
    await prisma.user.update({
      where: { id: userId },
      data: { moneyInPocket: { increment: amount } },
    });
  } else {
    await prisma.store.update({
      where: { id: userId },
      data: { moneyInPocket: { increment: amount } },
    });
  }
  return transaction;
};

const createWithdrawPayment = async ({
  isUser = true,
  userId,
  amount,
  purpose,
  currency,
}) => {
  const transactionModel =
    isUser == true
      ? {
          type: "withdraw",
          amount: amount,
          userId: userId,
          purpose: purpose || undefined,
          currency: currency || undefined,
        }
      : {
          type: "withdraw",
          amount: amount,
          storeId: userId,
          purpose: purpose || undefined,
          currency: currency || undefined,
        };
  const transaction = await prisma.transaction.create({
    data: transactionModel,
  });
  if (isUser == true) {
    await prisma.user.update({
      where: { id: userId },
      data: { moneyInPocket: { decrement: amount } },
    });
  } else {
    await prisma.store.update({
      where: { id: userId },
      data: { moneyInPocket: { decrement: amount } },
    });
  }
  return transaction;
};

//pending, confirmed, shipped, delivered, cancelled, refunded
const getAllTransactions = async (req, res, next) => {
  console.log(req.user);
  const transactions =
    req.user.role == userConstant || req.user.role == adminConstant
      ? await prisma.transaction.findMany({
          where: { userId: req.user.id },
        })
      : await prisma.transaction.findMany({
          where: { storeId: req.user.id },
        });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    // userCart: userCart,
    count: transactions.length,
    data: transactions,
  });
};

module.exports = {
  createDepositPayment,
  createWithdrawPayment,
  getAllTransactions,
};
