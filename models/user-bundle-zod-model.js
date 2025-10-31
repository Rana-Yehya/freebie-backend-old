const { z } = require("zod");
const UserBundleZodModel = z.object({
  // isAvailable              Boolean   @default(true)
  // isFeatured               Boolean   @default(false)
  // isPopular                Boolean   @default(false)
  bundleId: z
    .string({ message: "Bundle is required" })
    .uuid({ message: "Bundle Id is not a valid UUID" }),
  // color: z
  //   .string({ message: "Color is required" })
  //   .min(6, { message: "Color should be a 6 octal hex digit" })
  //   .max(6, { message: "Color should be a 6 octal hex digit" }),
  quantity: z.number({ message: "Quantity is required" }),
});
module.exports = { UserBundleZodModel };
