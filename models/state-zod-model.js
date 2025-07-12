const { z } = require("zod");
const { LocaleZodModel } = require("./locole-zod-model");

const StateZodModel = z.object({
  name: LocaleZodModel, //z.string({ message: "Name is required" }),
  countryId: z.string({ message: "Country is required" }),
});
module.exports = { StateZodModel };
