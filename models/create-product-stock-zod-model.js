const { z } = require("zod");

const CreateProductStockZodModel = z.object({
  stock: z.number().optional(),
  color: z
    .string({ message: "Color is required" })
    .min(6, { message: "Color should be a 6 octal hex digit" })
    .max(6, { message: "Color should be a 6 octal hex digit" }),
  branchId: z
    .string({ message: "Please enter a branch" })
    .uuid({ message: "Please enter a valid branch id" }),
});
module.exports = { CreateProductStockZodModel };
