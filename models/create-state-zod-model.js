const { z } = require("zod");
const { CreateLocaleZodModel } = require("./create-locole-zod-model");

const CreateStateZodModel = z.object({
  name: CreateLocaleZodModel, //z.string({ message: "Name is required" }),
  countryId: z.string({ message: "Country is required" }),
});
module.exports = { CreateStateZodModel };
