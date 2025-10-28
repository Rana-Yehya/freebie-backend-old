const { z } = require("zod");
const { UpdateLocaleZodModel } = require("./update-locole-zod-model");

const UpdateInfoZodModel = z.object({
  slug: z
    .string({ message: "Please enter a slug" })
    .refine(
      (slug) =>
        ["about", "privacy", "refund", "terms", "shipping"].includes(slug),
      {
        message: "Slug is not a one of the slug keys",
      }
    ),
  data: UpdateLocaleZodModel, //  z.string({ message: "Please enter a description" }),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdateInfoZodModel };
