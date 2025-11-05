const { z } = require("zod");
const { phone } = require("phone");
const {
  CreateUserLocationZodModel,
} = require("./create-user-location-zod-model");

const CreateUserZodModel = z.object({
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
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  // userCountry: z.string({ message: "Country is required" }),
  // userState: z.string({ message: "State is required" }),
  userLocation: CreateUserLocationZodModel,
  phone: z
    .string({ message: "Phone number is required" })
    .refine(
      (phoneNumber) =>
        phoneNumber != undefined &&
        phone(phoneNumber.toString()).isValid == true,
      {
        message: "The phone number is not correct",
      }
    ),
  password: z.string({ message: "Password is required" }),
  fcmToken: z.string().optional(),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreateUserZodModel };
