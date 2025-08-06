const { z } = require("zod");
const { UpdateLocaleZodModel } = require("./update-locole-zod-model");

const UpdateStateZodModel = z.object({
  name: UpdateLocaleZodModel, //z.string({ message: "Name is required" }),
  countryId: z.string({ message: "Country is required" }).optional(),
});
module.exports = { UpdateStateZodModel };
