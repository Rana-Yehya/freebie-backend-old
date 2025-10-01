const crypto = require("crypto");
const { redis } = require("../../config/redis");
const { client } = require("../../config/twilio");
const { BadRequestError } = require("../../errors");
const i18n = require("i18n");

const sendOtpHelper = async ({ name, phone, email }) => {
  const otp = crypto.randomInt(1000, 9999).toString();
  //send the mail
  console.log("otp", otp);
  const message = i18n.__("Your verification code is ");
  // const clientTwilioResponse = await client.messages.create({
  //   body: message + otp,
  //   from: "Freebie", // Alphanumeric sender ID or Twilio number
  //   to: phone, // Recipient's phone number
  // });
  console.log(message);
  // if (clientTwilioResponse.errorMessage != null) {
  //   throw new BadRequestError(clientTwilioResponse.errorMessage);
  // }
  // const emailTemplatePath = path.join(
  //   __dirname,
  //   "..",
  //   "..",
  //   "templates",
  //   "email-template.ejs"
  // );
  // await sendValidationEmail({
  //   email: email,
  //   from: `"Maddison Foo Koch 👻" ${process.env.SMTP_USER}`,
  //   subject: "Email Validation",
  //   emailTemplatePath: emailTemplatePath,
  //   data: {
  //     name: name,
  //     otp: otp,
  //   },
  // });
  //save the otp

  await redis.set(`otp:${phone}`, otp, "EX", 300); // 60 * 5
  //save user cooldown so he wont send another mail
  await redis.set(`otp_cooldown:${phone}`, otp, "EX", 60);
};
module.exports = { sendOtpHelper };
