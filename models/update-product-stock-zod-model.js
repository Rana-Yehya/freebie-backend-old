const { z } = require("zod");

const UpdateProductStockZodModel = z.object({
  productStockId: z
    .string({ message: "Please enter a product stock id" })
    .uuid()
    .optional(),
  stock: z.number().optional(),
  color: z
    .string({ message: "Color is required" })
    .min(6, { message: "Color should be a 6 octal hex digit" })
    .max(6, { message: "Color should be a 6 octal hex digit" })
    .optional(),
  branchId: z.string({ message: "Please enter a branch" }).optional(),
});
module.exports = { UpdateProductStockZodModel };
