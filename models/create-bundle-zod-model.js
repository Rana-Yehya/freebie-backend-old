const { z } = require("zod");

const { CreateLocaleZodModel } = require("./create-locole-zod-model");
const { CreateBundleItemZodModel } = require("./create-bundle-item-zod-model");

const CreateBundleZodModel = z.object({
  // isAvailable              Boolean   @default(true)
  // isFeatured               Boolean   @default(false)
  // isPopular                Boolean   @default(false)
  name: CreateLocaleZodModel, //z.string({ message: "Name is required" }),
  mainImage: z
    .any({
      message: "Image is required",
    })
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          // "image/svg+xml",
          // "image/gif",
        ].includes(file.mimetype),
      { message: "Banner is Invalid image file type" }
    )
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Banner image is too large",
    }),

  description: CreateLocaleZodModel, //z.string({ message: "Description is required" }),
  price: z
    .string({ message: "Price is required" })
    .refine((price) => parseFloat(price) > 0, {
      message: "Price is not a number or it is less than zero",
    }),
  // bundleItems: z.array(CreateBundleItemZodModel),
  bundleItems: z
    .array(CreateBundleItemZodModel, {
      message: "Product Items can't be empty",
    })
    .nonempty({
      message: "Product Items can't be empty",
    }),
});

// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreateBundleZodModel };
