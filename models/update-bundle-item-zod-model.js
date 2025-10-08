const { z } = require("zod");

const UpdateBundleItemZodModel = z.object({
  quantity: z.number().optional(),
  productVariantId: z
    .string({
      message: "Please enter a product variant id",
    })
    .uuid({
      message: "Please enter a valid product variant id",
    }),
});
module.exports = { UpdateBundleItemZodModel };
