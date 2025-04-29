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

const verifyOtpHelper = async ({ phone, userOtp }) => {
  //   let account = nodemailer.createTestAccount();
  // await redis.set(`otp:${phone}`, otp, "EX", 300); // 60 * 5
  console.log(phone);

  const otp = await redis.get(`otp:${phone}`);
  //otp:+201275559131
  console.log(otp);
  if (!otp) {
    throw new BadRequestError("Invalid or expired OTP");
  }
  const failedAttemptsKey = `otp_attempts:${phone}`;

  const failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || "0");
  if (userOtp !== otp) {
    if (failedAttempts > 2) {
      await redis.set(`otp_lock:${phone}`, "locked", "EX", 1800); // 60 secs * 60 mins
      await redis.del(`otp:${phone}`);
      throw new RateLimitError(
        "Too many failed OTP requests. Wait half an hour and request again"
      );
    } else {
      await redis.set(failedAttemptsKey, failedAttempts + 1, "EX", 300);
      throw new BadRequestError(
        `Incorrect OTP. ${2 - failedAttempts} attempts left.`
      );
    }
  } else {
    await redis.del(`otp:${phone}`);
  }

  //   res.json(info);
};
module.exports = { verifyOtpHelper };
