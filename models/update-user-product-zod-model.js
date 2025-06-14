const { z } = require("zod");
const UpdateUserProductZodModel = z.object({
  // isAvailable              Boolean   @default(true)
  // isFeatured               Boolean   @default(false)
  // isPopular                Boolean   @default(false)
  productId: z.string({ message: "Product is required" }),
  color: z
    .string({ message: "Color is required" })
    .min(6, { message: "Color should be a 6 octal hex digit" })
    .max(6, { message: "Color should be a 6 octal hex digit" }),
  quantity: z.number({ message: "Quantity is required" }),
  branchId: z.string({ message: "Branch is required" }),
});
module.exports = { UpdateUserProductZodModel };
