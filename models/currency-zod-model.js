const { z } = require("zod");
const { LocaleZodModel } = require("./locole-zod-model");

const CurrencyZodModel = z.object({});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CurrencyZodModel };
