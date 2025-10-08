const { z } = require("zod");

const ProductStatusZodModel = z.object({
  productId: z
    .string({
      message: "Please enter a product id",
    })
    .uuid({
      message: "Please enter a valid product id",
    }),
  status: z
    .string({ message: "Please enter a status" })
    .refine((status) => ["pending", "approved", "deleted"].includes(status), {
      message: "Status is not a one of the status keys",
    }), //work hours
});
module.exports = { ProductStatusZodModel };
