const { z } = require("zod");
const { NameZodModel } = require("./name-zod-model");

const StoreZodModel = z.object({
  // store - restaurant - place for weddings

  name: NameZodModel, //
  bio: NameZodModel, // z.string({ message: "Please enter a description" }),
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
  phone: z.string({ message: "Please enter a phone number" }),
  email: z.string({ message: "Please enter am email" }),
  password: z.string({ message: "Please enter a password" }),
  // socialLinks: SocialMediaZodModel,
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
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { StoreZodModel };
