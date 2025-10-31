const { z } = require("zod");

const ProductVariantZodModel = z.object({
  productId: z
    .string({
      message: "Please enter a product id",
    })
    .uuid({
      message: "Please enter a valid product id",
    }),
  productVariantId: z
    .string({
      message: "Please enter a product variant id",
    })
    .uuid({
      message: "Please enter a valid product variant id",
    }),
});
module.exports = { ProductVariantZodModel };
