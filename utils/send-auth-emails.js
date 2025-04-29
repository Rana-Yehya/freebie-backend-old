const { sendEmail } = require("../controllers/email-controller");

const sendVerifiedEmail = async ({
  email,
  name,
  verificationToken,
  origin,
}) => {
  const verifyUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Please Confirm your email by clicking on the following link <a href=${verifyUrl}>Verify Email</a></p>`;
  await sendEmail({
    to: email,
    subject: "Email Confirmation",
    messegeHtml: `<h4>Hello ${name}</h4>
     ${message}`,
  });
};
const sendResetPasswordEmail = async ({
  email,
  name,
  passwordToken,
  origin,
}) => {
  const resetUrl = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`;
  const message = `<p>Please reset your password by clicking on the following link <a href=${resetUrl}>Reset Password</a></p>`;
  await sendEmail({
    to: email,
    subject: "Password Reset",
    messegeHtml: `<h4>Hello ${name}</h4>
     ${message}`,
  });
};
module.exports = {
  sendVerifiedEmail,
  sendResetPasswordEmail,
};
