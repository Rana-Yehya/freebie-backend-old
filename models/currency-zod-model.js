const { z } = require("zod");
const { CreateLocaleZodModel } = require("./create-locole-zod-model");

const CurrencyZodModel = z.object({});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CurrencyZodModel };
