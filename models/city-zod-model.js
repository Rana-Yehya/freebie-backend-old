const { z } = require("zod");

const CityZodModel = z.object({
  name: z.string({ message: "Name is required" }),
  stateId: z.string({ message: "State is required" }),
});
module.exports = { CityZodModel };
