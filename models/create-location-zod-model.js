const { z } = require("zod");

const CreateLocationZodModel = z.object({
  address: z
    .string({ message: "Please enter an address" })
    .url({ message: "Please enter a link" })
    .optional(),
  // countryId: z.string({ message: "Please enter a country" }),
  // storeId: z.string({ message: "Please enter a description" }),
  stateId: z.string({ message: "Please enter a state" }).uuid(),
  //work hours
});
module.exports = { CreateLocationZodModel };
