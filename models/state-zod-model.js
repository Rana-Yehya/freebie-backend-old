const { z } = require("zod");
const { NameZodModel } = require("./name-zod-model");

const StateZodModel = z.object({
  name: NameZodModel, //z.string({ message: "Name is required" }),
  countryId: z.string({ message: "Country is required" }),
});
module.exports = { StateZodModel };
