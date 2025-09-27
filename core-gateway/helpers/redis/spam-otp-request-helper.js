const { redis } = require("../../config/redis");
const { RateLimitError } = require("../../errors");

const spamOtpRequestHelper = async ({ phone, next }) => {
  const otpRequestKey = `otp_request_key:${phone}`;
  const otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");
  if (otpRequests > 2) {
    await redis.set(`otp_spam_lock:${phone}`, "locked", "EX", 3600); // 60 secs * 60 mins
    throw new RateLimitError(
      "Too many OTP requests. Wait an hour and request again"
    );
  } else {
    await redis.set(otpRequestKey, otpRequests + 1, "EX", 3600);
    // next();
  }
};

module.exports = { spamOtpRequestHelper };
