const { adminConstant } = require("../config/constants");
const { prisma } = require("../config/prisma");
const { UnauthorizatedError } = require("../errors");
const { appLocalize } = require("../helpers/localize");

const localizationMiddleware = async (req, res, next) => {
  console.log("lang", req.headers);

  console.log("lang", req.headers["accept-language"]);

  const lang = req.headers["accept-language"]?.startsWith("ar") ? "ar" : "en";
  console.log("lang", lang);

  // Attach localization function to request
  req.lang = lang;
  appLocalize.setLocale(lang);
  // console.log(appLocalize.t("hello"));
  // console.log(appLocalize.t("Internal Server Error"));
  next();
};
module.exports = { localizationMiddleware };
