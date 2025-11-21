const { z } = require("zod");
const { UpdateLocaleZodModel } = require("./update-locale-zod-model");
const {
  UpdatePackagingVariationZodModel,
} = require("./update-packaging-variation-zod-model");

const UpdatePackageZodModel = z.object({
  id: z
    .string({ message: "Please enter an id" })
    .uuid({ message: "Please enter a valid id" }),
  name: UpdateLocaleZodModel, //z.string({ message: "Name is required" }),
  image: z
    .any({ message: "Images are required" })
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          // "image/svg+xml",
          // "image/gif",
        ].includes(file.mimetype),
      { message: "Image is Invalid file type" }
    )
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Image is too large",
    })
    .optional(),
  price: z
    .string({ message: "Price is required" })
    .refine((price) => parseFloat(price) > 0, {
      message: "Price is not a number or it is less than zero",
    })
    .optional(),
  dimensionsWCm: z
    .string({ message: "Dimensions Width is required" })
    .refine((dimensionsWCm) => parseFloat(dimensionsWCm) > 0, {
      message: "Dimensions Width is not a number or it is less than zero",
    })
    .optional(),
  dimensionsHCm: z
    .string({ message: "Dimensions Height is required" })
    .refine((dimensionsHCm) => parseFloat(dimensionsHCm) > 0, {
      message: "Dimensions Height is not a number or it is less than zero",
    })
    .optional(),
  dimensionsLCm: z
    .string({ message: "Dimensions Length is required" })
    .refine((dimensionsLCm) => parseFloat(dimensionsLCm) > 0, {
      message: "Dimensions Length is not a number or it is less than zero",
    })
    .optional(),
  packagingVariation: z
    .array(UpdatePackagingVariationZodModel, {
      message: "Package Variant can't be empty",
    })
    .nonempty({
      message: "Package Variant can't be empty",
    })
    .optional(),
  packageType: z
    .string({ message: "Please enter a package type" })
    .refine(
      (packageType) => ["giftbox", "giftbag", "wrapping"].includes(packageType),
      {
        message: "Package Type is not a one of the type keys",
      }
    )
    .optional(),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdatePackageZodModel };
