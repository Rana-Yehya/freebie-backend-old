const { z } = require("zod");
const { CreateLocationZodModel } = require("./create-location-zod-model");
const { phone } = require("phone");

const CreateBranchZodModel = z.object({
  storeId: z
    .string({
      message: "Please enter a store id",
    })
    .uuid({
      message: "Please enter a valid store id",
    }),
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
  location: CreateLocationZodModel,
  //work hours
});
module.exports = { CreateBranchZodModel };
