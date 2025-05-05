const { z } = require("zod");

const ProductStockZodModel = z.object({
  stock: z.number().optional(),
  branchId: z.string({ message: "Please enter a branch ID" }),
});
module.exports = { ProductStockZodModel };
