const { z } = require("zod");

const UserZodModel = z.object({
  // avatar      Image?
  // createdAt   DateTime  @default(now())
  // updatedAt   DateTime  @updatedAt
  // imageId     String    @db.ObjectId
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  dateOfBirth: z.string().date("Invalid date of birth"),
  gender: z.enum(["male", "female"], { message: "Invalid gender" }),
  email: z.string().email({ message: "Invalid email address" }),
  userCountry: z.string({ message: "Name is required" }),
  phone: z.string(),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { UserZodModel };
