const { z } = require("zod");

const OrderStatusZodModel = z
  .object({
    orderId: z
      .string({
        message: "Please enter a store id",
      })
      .uuid({
        message: "Please enter a valid store id",
      }),
    status: z.string({ message: "Please enter a status" }).refine(
      (status) =>
        [
          "confirmed",
          "shipped",
          // "delivered",
          "cancelled",
          //   "refunded",
        ].includes(status),
      {
        message: "Status is not a one of the status keys",
      }
    ),

    cancellationReason: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.cancellationReason == undefined && data.status == "cancelled") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a cancellation reason",
      });
    }
  });
module.exports = { OrderStatusZodModel };
