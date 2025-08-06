const { z } = require("zod");
const { CreateLocaleZodModel } = require("./create-locole-zod-model");

const InfoZodModel = z.object({
  slug: z
    .string({ message: "Please enter a slug" })
    .refine(
      (slug) =>
        ["about", "privacy", "refund", "terms", "shipping"].includes(slug),
      {
        message: "Slug is not a one of the slug keys",
      }
    ),
  data: CreateLocaleZodModel, //  z.string({ message: "Please enter a description" }),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { InfoZodModel };
