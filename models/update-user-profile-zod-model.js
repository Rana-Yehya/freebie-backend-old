const { z } = require("zod");

const UpdateUserProfileZodModel = z.object({
  // avatar      Image?
  // createdAt   DateTime  @default(now())
  // updatedAt   DateTime  @updatedAt
  // imageId     String    @db.ObjectId
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" })
    .optional(),
  dateOfBirth: z.string().date("Invalid date of birth").optional(),
  gender: z.enum(["male", "female"], { message: "Invalid gender" }).optional(),
  userCountry: z.string({ message: "Country is required" }).optional(),
  userState: z.string({ message: "State is required" }).optional(),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { UpdateUserProfileZodModel };
