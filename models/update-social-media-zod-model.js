const { z } = require("zod");

const UpdateSocialMediaZodModel = z.object({
  // store - restaurant - place for weddings
  tiktok: z
    .string()
    .url({
      message: "It does not seem a valid link",
    })
    .includes("tiktok", { message: "It does not seem a valid tiktok link" })
    .optional(),
  youtube: z
    .string()
    .url({
      message: "It does not seem a valid link",
    })
    .includes("youtube", {
      message: "It does not seem a valid youtube link",
    })
    .optional(),
  facebook: z
    .string()
    .url({
      message: "It does not seem a valid link",
    })
    .includes("facebook", {
      message: "It does not seem a valid facebook link",
    })
    .optional(),
  x: z
    .string()
    .url({
      message: "It does not seem a valid link",
    })
    .includes("x", { message: "It does not seem a valid X link" })
    .optional(),
  instagram: z
    .string()
    .url({
      message: "It does not seem a valid link",
    })
    .includes("instagram", {
      message: "It does not seem a valid instagram link",
    })
    .optional(),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdateSocialMediaZodModel };
