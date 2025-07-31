const { z } = require("zod");

const UpdateLocationZodModel = z.object({
  address: z
    .string({ message: "Please enter an address" })
    .url({ message: "Please enter a link" })
    .optional(),
  // countryId: z.string({ message: "Please enter a country" }),
  // storeId: z.string({ message: "Please enter a description" }),
  stateId: z.string({ message: "Please enter a state" }).uuid().optional(),

  //work hours
});
module.exports = { UpdateLocationZodModel };
