const { z } = require("zod");

const UpdateDiscountZodModel = z
  .object({
    id: z
      .string({
        message: "ID is required",
      })
      .uuid({
        message: "Please enter a valid discount id",
      }),
    discountPercent: z
      .number({
        message: "Discount Percent is required",
      })
      .refine(
        (discountPercent) =>
          parseFloat(discountPercent) >= 0 &&
          parseFloat(discountPercent) <= 100,
        {
          message:
            "Discount Percent is not a number or it is less than zero or it is bigger than 100",
        }
      )
      .optional(),

    discountStartTime: z
      .string()
      .datetime({ message: "Invalid discount start time" })
      .refine((discountStartTime) => discountStartTime < new Date(), {
        message: "Discount start time must be in the future",
      })
      .optional(),

    discountEndTime: z
      .string()
      .datetime({ message: "Invalid discount end time" })
      .refine((discountEndTime) => discountEndTime < new Date(), {
        message: "Discount end time must be in the future",
      })
      .optional(),

    // .min(3, { message: "Name must be at least 3 characters long" })

    //
    // gender: z.enum(["male", "female"], { message: "Invalid gender" }),
  })
  .superRefine((data, ctx) => {
    if (
      data.discountStartTime != undefined &&
      data.discountEndTime != undefined
    ) {
      const discountStartTime = new Date(Date.parse(data.discountStartTime));
      const discountEndTime = new Date(Date.parse(data.discountEndTime));

      if (discountStartTime >= discountEndTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount start time must be before discount end time",
          path: ["discountStartTime", "discountEndTime"],
        });
      }
    }
  });
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdateDiscountZodModel };
