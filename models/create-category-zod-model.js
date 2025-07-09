const { z } = require("zod");
const { NameZodModel } = require("./name-zod-model");

const CreateCategoryZodModel = z.object({
  name: NameZodModel, //z.string({ message: "Name is required" }),
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

  canBeDeliveredOutsideState: z
    .string()
    .refine(
      (canBeDeliveredOutsideState) =>
        canBeDeliveredOutsideState === "true" ||
        canBeDeliveredOutsideState === "false",
      {
        message:
          "Availablity to deliver outside the state does not equal to true or false",
      }
    )
    .default("true"),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { CreateCategoryZodModel };
