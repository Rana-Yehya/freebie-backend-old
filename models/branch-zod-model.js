const { z } = require("zod");
const { LocationZodModel } = require("./location-zod-model");

const BranchZodModel = z.object({
  // address: z
  //   .string({ message: "Please enter an address" })
  //   .url({ message: "Please enter a link" }),
  // countryId: z.string({ message: "Please enter a country" }),
  // storeId: z.string({ message: "Please enter a description" }),
  phone: z.string().optional(),
  // stateId: z.string({ message: "Please enter a state" }),
  location: LocationZodModel,
  //work hours
});
module.exports = { BranchZodModel };
