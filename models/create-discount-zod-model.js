const { z } = require("zod");

const CreateDiscountZodModel = z
  .object({
    // storeId: z
    //   .string({
    //     message: "Store is required",
    //   })
    //   .uuid({
    //     message: "Please enter a valid store id",
    //   }),
    discountPercent: z
      .number({
        message: "Discount Percent is required",
      })
      .refine(
        (discountPercent) =>
          parseInt(discountPercent) > 0 && parseInt(discountPercent) < 100,
        {
          message:
            "Discount Percent is not a number or it is less than zero or it is bigger than 100",
        }
      ),

    discountStartTime: z
      .string()
      .datetime({ message: "Invalid discount start time" })
      .refine((discountStartTime) => new Date(discountStartTime) > new Date(), {
        message: "Discount start time must be in the future",
      }),

    discountEndTime: z
      .string()
      .datetime({ message: "Invalid discount end time" })
      .refine((discountEndTime) => new Date(discountEndTime) > new Date(), {
        message: "Discount end time must be in the future",
      }),
    // .min(3, { message: "Name must be at least 3 characters long" })

    //
    // gender: z.enum(["male", "female"], { message: "Invalid gender" }),
  })
  .superRefine((data, ctx) => {
    const discountStartTime = new Date(data.discountStartTime);
    const discountEndTime = new Date(data.discountEndTime);

    if (discountStartTime > discountEndTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Discount start time must be before discount end time",
        path: ["discountStartTime", "discountEndTime"],
      });
    }
  });
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreateDiscountZodModel };
