const { z } = require("zod");

const LocationZodModel = z.object({
  address: z
    .string({ message: "Please enter an address" })
    .url({ message: "Please enter a link" }),
  // countryId: z.string({ message: "Please enter a country" }),
  // storeId: z.string({ message: "Please enter a description" }),
  stateId: z.string({ message: "Please enter a state" }),
  //work hours
});
module.exports = { LocationZodModel };
