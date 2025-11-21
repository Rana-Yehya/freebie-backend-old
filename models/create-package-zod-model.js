const { z } = require("zod");
const { CreateLocaleZodModel } = require("./create-locole-zod-model");
const {
  CreatePackagingVariationZodModel,
} = require("./create-packaging-variation-zod-model");

const CreatePackageZodModel = z.object({
  name: CreateLocaleZodModel, //z.string({ message: "Name is required" }),
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
    }),
  price: z
    .string({ message: "Price is required" })
    .refine((price) => parseFloat(price) > 0, {
      message: "Price is not a number or it is less than zero",
    }),
  packagingVariation: z
    .array(CreatePackagingVariationZodModel, {
      message: "Package Variations can't be empty",
    })
    .nonempty({
      message: "Package Variations can't be empty",
    }),

  dimensionsWCm: z
    .string({ message: "Dimensions Width is required" })
    .refine((dimensionsWCm) => parseFloat(dimensionsWCm) > 0, {
      message: "Dimensions Width is not a number or it is less than zero",
    }),
  dimensionsHCm: z
    .string({ message: "Dimensions Height is required" })
    .refine((dimensionsHCm) => parseFloat(dimensionsHCm) > 0, {
      message: "Dimensions Height is not a number or it is less than zero",
    }),
  dimensionsLCm: z
    .string({ message: "Dimensions Length is required" })
    .refine((dimensionsLCm) => parseFloat(dimensionsLCm) > 0, {
      message: "Dimensions Length is not a number or it is less than zero",
    }),

  packageType: z
    .string({ message: "Please enter a package type" })
    .refine(
      (packageType) => ["giftbox", "giftbag", "wrapping"].includes(packageType),
      {
        message: "Package Type is not a one of the type keys",
      }
    ),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreatePackageZodModel };
