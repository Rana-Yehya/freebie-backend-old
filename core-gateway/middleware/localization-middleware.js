const i18n = require("i18n");

const localizationMiddleware = async (req, res, next) => {
  const lang = req.headers["accept-language"]?.startsWith("ar") ? "ar" : "en";

  // Attach localization function to request
  req.lang = lang;
  i18n.setLocale(lang);
  next();
};
module.exports = { localizationMiddleware };
