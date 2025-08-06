const { z } = require("zod");

const CreateDeliveryTaxesZodModel = z.object({
  // avatar      Image?
  // createdAt   DateTime  @default(now())
  // updatedAt   DateTime  @updatedAt
  // imageId     String    @db.ObjectId

  originStateId: z
    .string({
      message: "Origin State is required",
    })
    .uuid(),
  destinationStateId: z
    .string({
      message: "Destination State is required",
    })
    .uuid(),
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
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreateDeliveryTaxesZodModel };
