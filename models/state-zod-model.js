const { z } = require("zod");

const StateZodModel = z.object({
  name: z.string({ message: "Name is required" }),
  countryId: z.string({ message: "Country is required" }),
});
module.exports = { StateZodModel };
