const { z } = require("zod");

const SupportZodModel = z.object({
  slug: z
    .string({ message: "Please enter a slug" })
    .refine((slug) => ["suggestion", "problem"].includes(slug), {
      message: "Slug is not a one of the slug keys",
    }),
  message: z.string({ message: "Please enter a description" }),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { SupportZodModel };
