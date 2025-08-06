const { z } = require("zod");

const UpdateDeliveryTaxesZodModel = z.object({
  // avatar      Image?
  // createdAt   DateTime  @default(now())
  // updatedAt   DateTime  @updatedAt
  // imageId     String    @db.ObjectId
  id: z
    .string({
      message: "Please enter a delivery taxes id",
    })
    .uuid({
      message: "Please enter a valid delivery taxes id",
    }),
  originStateId: z.string().uuid().optional(),
  destinationStateId: z.string().uuid().optional(),
  baseFee: z.number().optional(),
  additionalFeesAfterKg: z.number().optional(),
  feePerKg: z.number().optional(),
  // .min(3, { message: "Name must be at least 3 characters long" })

  //
  // gender: z.enum(["male", "female"], { message: "Invalid gender" }),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdateDeliveryTaxesZodModel };
