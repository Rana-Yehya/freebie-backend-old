const { prisma } = require("../config/prisma");
const { StatusCodes } = require("http-status-codes");
const i18n = require("i18n");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { userConstant, adminConstant } = require("../config/constants");
const { TransactionType } = require("../generated/prisma");
const createDepositPayment = async ({
  type,
  isUser = true,
  userId,
  amount,
  purpose,
  currency,
}) => {
  console.log({ type, userId, amount, purpose, currency });
  const transactionModel =
    isUser == true
      ? {
          type: type || undefined,
          amount: amount,
          userId: userId,
          purpose: purpose || undefined,
          currency: currency || undefined,
        }
      : {
          type: type || undefined,
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
  type,
  userId,
  amount,
  userMoneyInPocket,
  purpose,
  currency,
}) => {
  if (amount > userMoneyInPocket) {
    throw new BadRequestError("Not enough money in pocket");
  }
  const transactionModel =
    isUser == true
      ? {
          type: type || undefined,
          amount: amount,
          userId: userId,
          purpose: purpose || undefined,
          currency: currency || undefined,
        }
      : {
          type: type || undefined,
          amount: amount,
          storeId: userId,
          purpose: purpose || undefined,
          currency: currency || undefined,
        };

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
  const transaction = await prisma.transaction.create({
    data: transactionModel,
  });
  return transaction;
};

//pending, confirmed, shipped, delivered, cancelled, refunded
const getAllTransactions = async (req, res, next) => {
  console.log(req.role);
  const transactions =
    req.role == userConstant
      ? await prisma.transaction.findMany({
          where: { userId: req.user.id },
          orderBy: {
            createdAt: "desc",
          },
        })
      : req.role == adminConstant
      ? await prisma.transaction.findMany({
          where: { adminId: req.user.id },
          orderBy: {
            createdAt: "desc",
          },
        })
      : await prisma.transaction.findMany({
          where: { storeId: req.user.id },
          orderBy: {
            createdAt: "desc",
          },
        });

  return res.status(StatusCodes.OK).json({
    isSuccess: true,
    // userCart: userCart,
    count: transactions.length,
    data: transactions,
  });
};
const createWithdrawTransaction = async (req, res, next) => {
  console.log(req.user);
  const { amount } = req.body; //purpose, currency
  if (amount > req.user.moneyInPocket) {
    throw new BadRequestError("Not enough money in pocket");
  }
  const transactionModel =
    req.user.role == userConstant || req.user.role == adminConstant
      ? {
          type: TransactionType.WITHDRAW,
          amount: amount,
          userId: req.user.id,
          purpose: "withdraw",
          currency: currency || undefined,
        }
      : {
          type: TransactionType.WITHDRAW,
          amount: amount,
          storeId: req.user.id,
          purpose: "withdraw",
          currency: currency || undefined,
        };

  if (req.user.role == userConstant || req.user.role == adminConstant) {
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
  const transaction = await prisma.transaction.create({
    data: transactionModel,
  });
  return res.status(StatusCodes.CREATED).json({
    isSuccess: true,
    // userCart: userCart,
    message: i18n.__("Transaction created successfully"),
    data: transaction,
  });
};

module.exports = {
  createDepositPayment,
  createWithdrawPayment,
  getAllTransactions,
  createWithdrawTransaction,
};
