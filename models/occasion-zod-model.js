const { z } = require("zod");
const { LocaleZodModel } = require("./locole-zod-model");

const OccasionZodModel = z.object({
  name: LocaleZodModel, // z.string({ message: "Name is required" }),
  image: z
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
      { message: "Image is Invalid file type" }
    )
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Image is too large",
    }),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { OccasionZodModel };
