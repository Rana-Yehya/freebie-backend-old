const { z } = require("zod");

const CreateProductStockZodModel = z.object({
  stock: z.number().optional(),
  productVariantId: z
    .string({ message: "Please enter a product variant id" })
    .uuid({ message: "Please enter a valid product variant id" }),
  branchId: z
    .string({ message: "Please enter a branch" })
    .uuid({ message: "Please enter a valid branch id" }),
});
module.exports = { CreateProductStockZodModel };
