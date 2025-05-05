const { z } = require("zod");

const OccasionZodModel = z.object({
  name: z.string({ message: "Name is required" }),
  image: z.string({ message: "Image is required" }),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { OccasionZodModel };
