const { z } = require("zod");

const CreatePackagingVariationZodModel = z.object({
  color: z
    .string({ message: "Color is required" })
    .min(6, { message: "Color should be a 6 octal hex digit" })
    .max(6, { message: "Color should be a 6 octal hex digit" }),
});
module.exports = { CreatePackagingVariationZodModel };
