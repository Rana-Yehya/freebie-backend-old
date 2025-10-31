const { z } = require("zod");

const UpdateUserLocationZodModel = z.object({
  userLocationId: z
    .string({
      message: "Please enter a location id",
    })
    .uuid({
      message: "Please enter a valid location id",
    }),
  // countryId: z.string({ message: "Please enter a country" }),
  // storeId: z.string({ message: "Please enter a description" }),
  stateId: z.string({ message: "Please enter a state" }).uuid().optional(),

  // isMain: z.boolean().optional(),

  //work hours
});
module.exports = { UpdateUserLocationZodModel };
