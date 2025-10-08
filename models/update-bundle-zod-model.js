const { z } = require("zod");

const { CreateLocaleZodModel } = require("./create-locole-zod-model");
const { CreateBundleItemZodModel } = require("./create-bundle-item-zod-model");
const { UpdateLocaleZodModel } = require("./update-locale-zod-model");
const { UpdateBundleItemZodModel } = require("./update-bundle-item-zod-model");

const UpdateBundleZodModel = z.object({
  // isAvailable              Boolean   @default(true)
  // isFeatured               Boolean   @default(false)
  // isPopular                Boolean   @default(false)
  id: z
    .string({
      message: "Please enter a bundle id",
    })
    .uuid({
      message: "Please enter a valid bundle id",
    }),
  name: UpdateLocaleZodModel, //z.string({ message: "Name is required" }),
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
    })
    .optional(),

  description: UpdateLocaleZodModel, //z.string({ message: "Description is required" }),
  price: z
    .string({ message: "Price is required" })
    .refine((price) => parseFloat(price) > 0, {
      message: "Price is not a number or it is less than zero",
    })
    .optional(),
  // bundleItems: z.array(CreateBundleItemZodModel),
  bundleItems: z
    .array(UpdateBundleItemZodModel, {
      message: "Product Items can't be empty",
    })
    .optional(),
});

// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdateBundleZodModel };
