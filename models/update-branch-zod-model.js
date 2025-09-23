const { z } = require("zod");
const { UpdateLocationZodModel } = require("./update-location-zod-model");
const { phone } = require("phone");

const UpdateBranchZodModel = z.object({
  branchId: z
    .string({
      message: "Please enter a branch id",
    })
    .uuid({
      message: "Please enter a valid branch id",
    }),
  // address: z
  //   .string({ message: "Please enter an address" })
  //   .url({ message: "Please enter a link" }),
  // countryId: z.string({ message: "Please enter a country" }),
  // storeId: z.string({ message: "Please enter a description" }),
  phone: z
    .string({
      message: "Please enter a phone number",
    })
    .refine(
      (phoneNumber) =>
        phoneNumber != undefined &&
        phone(phoneNumber.toString()).isValid == true,
      {
        message: "The phone number is not correct",
      }
    )
    .optional(),
  // stateId: z.string({ message: "Please enter a state" }),
  location: UpdateLocationZodModel,
  //work hours
});
module.exports = { UpdateBranchZodModel };
