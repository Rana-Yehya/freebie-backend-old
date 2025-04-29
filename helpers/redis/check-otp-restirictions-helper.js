const { redis } = require("../../config/redis");
const { LockedError, RateLimitError } = require("../../errors");

const checkOtpRestirictionsHelper = async ({ phone, next }) => {
  if (await redis.get(`otp_lock:${phone}`)) {
    throw new LockedError(
      "This resourse is locaked to this account. Please try again later"
    );
  } else if (await redis.get(`otp_spam_lock:${phone}`)) {
    throw new RateLimitError(
      "Too many OTP requests. Wait an hour and request again"
    );
  } else if (await redis.get(`otp_cooldown:${phone}`)) {
    throw new RateLimitError(
      "Please check for your phone for any incoming OTPs"
    );
  }
  // next();
};

module.exports = { checkOtpRestirictionsHelper };
