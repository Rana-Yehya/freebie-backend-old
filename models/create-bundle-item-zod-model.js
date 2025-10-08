const { z } = require("zod");

const CreateBundleItemZodModel = z.object({
  quantity: z.number().default(1),
  productVariantId: z
    .string({
      message: "Please enter a product variant id",
    })
    .uuid({
      message: "Please enter a valid product variant id",
    }),
});
module.exports = { CreateBundleItemZodModel };
