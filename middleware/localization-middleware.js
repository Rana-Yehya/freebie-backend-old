const { adminConstant } = require("../config/constants");
const { prisma } = require("../config/prisma");
const { UnauthorizedError } = require("../errors");
const { appLocalize } = require("../helpers/localize");

const localizationMiddleware = async (req, res, next) => {
  const lang = req.headers["accept-language"]?.startsWith("ar") ? "ar" : "en";

  // Attach localization function to request
  req.lang = lang;
  appLocalize.setLocale(lang);
  // console.log(appLocalize.t("hello"));
  // console.log(appLocalize.t("Internal Server Error"));
  next();
};
module.exports = { localizationMiddleware };
