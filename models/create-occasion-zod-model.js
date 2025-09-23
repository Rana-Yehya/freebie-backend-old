const { z } = require("zod");
const { CreateLocaleZodModel } = require("./create-locole-zod-model");

const CreateOccasionZodModel = z.object({
  name: CreateLocaleZodModel, // z.string({ message: "Name is required" }),
  image: z
    .any({
      message: "Images are required",
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
      { message: "Image is Invalid file type" }
    )
    .refine((file) => file.size <= 1024 * 1024, {
      message: "Image is too large",
    }),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreateOccasionZodModel };
