const { z } = require("zod");

const CreateReviewZodModel = z.object({
  productId: z
    .string({
      message: "Please enter a product id",
    })
    .uuid({
      message: "Please enter a valid product id",
    }),
  stars: z
    .number({ message: "Rating is required" })
    .refine((rate) => rate >= 1 && rate <= 5, {
      message: "Rating must be between 1 and 5",
    }),
  comment: z.string().optional(),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreateReviewZodModel };
