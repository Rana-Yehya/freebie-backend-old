const { z } = require("zod");

const SocialMediaZodModel = z
  .object({
    // store - restaurant - place for weddings
    tiktok: z
      .string()
      .includes("tiktok", { message: "It does not seem a valid tiktok link" })
      .url()
      .optional(),
    youtube: z
      .string()
      .includes("youtube", {
        message: "It does not seem a valid youtube link",
      })
      .url()
      .optional(),
    facebook: z
      .string()
      .includes("facebook", {
        message: "It does not seem a valid facebook link",
      })
      .url()
      .optional(),
    x: z
      .string()
      .includes("x", { message: "It does not seem a valid X link" })
      .url()
      .optional(),
    instagram: z
      .string()
      .includes("instagram", {
        message: "It does not seem a valid instagram link",
      })
      .url()
      .optional(),
  })
  .refine(
    ({ tiktok, youtube, facebook, x, instagram }) =>
      tiktok !== undefined ||
      youtube !== undefined ||
      facebook !== undefined ||
      x !== undefined ||
      instagram !== undefined,
    { message: "One of the social media links must be provided" }
  );
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { SocialMediaZodModel };
