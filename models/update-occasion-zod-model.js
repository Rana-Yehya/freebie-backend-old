const { z } = require("zod");
const { UpdateLocaleZodModel } = require("./update-locole-zod-model");

const UpdateOccasionZodModel = z.object({
  id: z
    .string({
      message: "Please enter an occasion id",
    })
    .uuid({
      message: "Please enter a valid occasion id",
    }),
  name: UpdateLocaleZodModel, // z.string({ message: "Name is required" }),
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
    })
    .optional(),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdateOccasionZodModel };
