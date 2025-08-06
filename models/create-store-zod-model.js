const { z } = require("zod");
const { CreateLocaleZodModel } = require("./create-locole-zod-model");
const {
  CreateSocialMediaZodModel,
} = require("./create-social-media-zod-model");
const { phone } = require("phone");

const CreateStoreZodModel = z.object({
  // store - restaurant - place for weddings

  name: CreateLocaleZodModel, //
  bio: CreateLocaleZodModel, // z.string({ message: "Please enter a description" }),
  logo: z
    .any()
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          // "image/svg+xml",
          // "image/gif",
        ].includes(file.mimetype),
      { message: "Logo is Invalid image file type" }
    )
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Logo image is too large",
    }),
  // logo: z.string({ message: "Please enter a logo" }),
  banner: z
    .any()
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
  phone: z
    .string({ message: "Please enter a phone number" })
    .refine(
      (phoneNumber) =>
        phoneNumber != undefined &&
        phone(phoneNumber.toString()).isValid == true,
      {
        message: "The phone number is not correct",
      }
    ),
  email: z.string({ message: "Please enter an email" }),
  password: z.string({ message: "Please enter a password" }),
  socialLinks: CreateSocialMediaZodModel,
  // socialLinks: z
  //   .object({
  //     tiktok: z
  //       .string()
  //       .includes("tiktok", { message: "It does not seem a valid tiktok link" })
  //       .url()
  //       .optional(),
  //     youtube: z
  //       .string()
  //       .includes("youtube", {
  //         message: "It does not seem a valid youtube link",
  //       })
  //       .url()
  //       .optional(),
  //     facebook: z
  //       .string()
  //       .includes("facebook", {
  //         message: "It does not seem a valid faceboon link",
  //       })
  //       .url()
  //       .optional(),
  //     x: z
  //       .string()
  //       .includes("x", { message: "It does not seem a valid X link" })
  //       .url()
  //       .optional(),
  //     instagram: z
  //       .string()
  //       .includes("instagram", {
  //         message: "It does not seem a valid instagram link",
  //       })
  //       .url()
  //       .optional(),
  //   })
  //   .refine(
  //     ({ tiktok, youtube, facebook, x, instagram }) =>
  //       tiktok !== undefined ||
  //       youtube !== undefined ||
  //       facebook !== undefined ||
  //       x !== undefined ||
  //       instagram !== undefined,
  //     { message: "One of the social media links must be provided" }
  //   ),
  type: z.string().optional(),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreateStoreZodModel };
