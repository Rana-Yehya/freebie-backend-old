const { z } = require("zod");

const ProductStockZodModel = z.object({
  productStockId: z
    .string({
      message: "Please enter a product stock id",
    })
    .uuid({
      message: "Please enter a valid product stock id",
    }),
  productVariantId: z
    .string({
      message: "Please enter a product variant id",
    })
    .uuid({
      message: "Please enter a valid product variant id",
    }),
});
module.exports = { ProductStockZodModel };
