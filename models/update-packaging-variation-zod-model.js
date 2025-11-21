const { z } = require("zod");

const UpdatePackagingVariationZodModel = z.object({
  packageVariantId: z
    .string({ message: "Please enter a package variant id" })
    .uuid({ message: "Please enter a valid package variant id" }),
  color: z
    .string({ message: "Color is required" })
    .min(6, { message: "Color should be a 6 octal hex digit" })
    .max(6, { message: "Color should be a 6 octal hex digit" }),
});
module.exports = { UpdatePackagingVariationZodModel };
