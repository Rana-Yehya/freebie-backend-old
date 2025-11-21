const { z } = require("zod");

const UpdateLocationZodModel = z.object({
  userLocationId: z
    .string({
      message: "Please enter a location id",
    })
    .uuid({
      message: "Please enter a valid location id",
    })
    .optional(),
  // countryId: z.string({ message: "Please enter a country" }),
  // storeId: z.string({ message: "Please enter a description" }),
  stateId: z
    .string({ message: "Please enter a state" })
    .uuid({
      message: "Please enter a valid state id",
    })
    .optional(),

  //work hours
});
module.exports = { UpdateLocationZodModel };
