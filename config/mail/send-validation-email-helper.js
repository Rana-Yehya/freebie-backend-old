const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const { ServerError } = require("../../errors");
const nodemailerConfig = require("./nodemailer-config");

const sendValidationEmail = async ({
  email,
  from,
  subject,
  emailTemplatePath,
  data,
}) => {
  //   let account = nodemailer.createTestAccount();
  try {
    const transporter = nodemailer.createTransport(nodemailerConfig);

    const html = await ejs.renderFile(emailTemplatePath, data);
    await transporter.sendMail({
      from: from, // sender address
      to: email,
      subject: subject, // Subject line
      // text: 'Hello world?', // plain text body
      html: html, // '<b>Hello world?</b>', // html body
    });
  } catch (err) {
    console.log(err);
    throw new ServerError("Could not send email. Please try again later");
  }
  //   res.json(info);
};
module.exports = { sendValidationEmail };
