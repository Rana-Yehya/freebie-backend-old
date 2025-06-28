const { z } = require("zod");

const CreateDeliveryTaxesZodModel = z.object({
  // avatar      Image?
  // createdAt   DateTime  @default(now())
  // updatedAt   DateTime  @updatedAt
  // imageId     String    @db.ObjectId

  originStateId: z.string({
    message: "Origin State ID is required",
  }),
  destinationStateId: z.string({
    message: "Destination State ID is required",
  }),
  baseFee: z.number({
    message: "Base Fee is required",
  }),
  additionalFeesAfterKg: z.number({
    message: "Additional Fees After Kg is required",
  }),
  feePerKg: z.number({
    message: "Fee Per Kg is required",
  }),
  // .min(3, { message: "Name must be at least 3 characters long" })

  //
  // gender: z.enum(["male", "female"], { message: "Invalid gender" }),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { CreateDeliveryTaxesZodModel };
