const { z } = require("zod");

const SupportZodModel = z.object({
  slug: z
    .string({ message: "Please enter a slug" })
    .refine(
      (slug) =>
        ["suggestion", "problem", "order_problem", "product_fraud"].includes(
          slug
        ),
      {
        message: "Slug is not a one of the slug keys",
      }
    ),
  message: z.string({ message: "Please enter a description" }),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { SupportZodModel };
