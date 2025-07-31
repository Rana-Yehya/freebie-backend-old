const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const {
  RateLimitError,
  ServerError,
  BadRequestError,
} = require("../../errors");
const nodemailerConfig = require("../../config/mail/nodemailer-config");
const { redis } = require("../../config/redis");

const createOrderHelper = async ({ userId }) => {
  //   let account = nodemailer.createTestAccount();
  // await redis.set(`otp:${phone}`, otp, "EX", 300); // 60 * 5

  const otp = await redis.set(`order:${userId}`, "true", "EX", 3600);
  //otp:+201275559131
  console.log(otp);

  //   res.json(info);
};

const verifyUserOrderHelper = async ({ userId }) => {
  //   let account = nodemailer.createTestAccount();
  // await redis.set(`otp:${phone}`, otp, "EX", 300); // 60 * 5

  const otp = await redis.get(`order:${userId}`);
  return otp;
  //otp:+201275559131
  // console.log(otp);
  // if (!otp) {
  //   // throw new RateLimitError("You have reached the limit of order requests");
  // }
  //   res.json(info);
};
module.exports = { createOrderHelper, verifyUserOrderHelper };
