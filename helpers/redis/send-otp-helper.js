const crypto = require("crypto");
const path = require("path");
const { redis } = require("../../config/redis");
const {
  sendValidationEmail,
} = require("../../config/mail/send-validation-email-helper");

const sendOtpHelper = async ({ name, phone, email }) => {
  const otp = crypto.randomInt(1000, 9999).toString();
  //send the mail
  const emailTemplatePath = path.join(
    __dirname,
    "..",
    "..",
    "templates",
    "email-template.ejs"
  );
  await sendValidationEmail({
    email: email,
    from: `"Maddison Foo Koch 👻" ${process.env.SMTP_USER}`,
    subject: "Email Validation",
    emailTemplatePath: emailTemplatePath,
    data: {
      name: name,
      otp: otp,
    },
  });
  //save the otp
  await redis.set(`otp:${phone}`, otp, "EX", 300); // 60 * 5
  //save user cooldown so he wont send another mail
  await redis.set(`otp_cooldown:${phone}`, otp, "EX", 60);
};
module.exports = { sendOtpHelper };
