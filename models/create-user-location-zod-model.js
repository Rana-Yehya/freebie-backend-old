const { z } = require("zod");

const CreateUserLocationZodModel = z.object({
  // countryId: z.string({ message: "Please enter a country" }),
  // storeId: z.string({ message: "Please enter a description" }),
  stateId: z
    .string({ message: "Please enter a state" })
    .uuid({ message: "Please enter a valid state id" }),

  isMain: z.boolean().optional(),
  //work hours
});
module.exports = { CreateUserLocationZodModel };
