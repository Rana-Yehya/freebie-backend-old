const { z } = require("zod");

const ReviewZodModel = z.object({
  stars: z
    .number({ message: "Rating is required" })
    .refine((rate) => rate >= 1 && rate <= 5, {
      message: "Rating must be between 1 and 5",
    }),
  comment: z.string().optional(),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { ReviewZodModel };
