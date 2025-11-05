const { z } = require("zod");
const { phone } = require("phone");

const UserLoginZodModel = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" })
      .optional(),
    // userCountry: z.string({ message: "Country is required" }),
    // userState: z.string({ message: "State is required" }),
    phone: z
      .string({ message: "Phone number is required" })
      .refine(
        (phoneNumber) =>
          phoneNumber != undefined &&
          phone(phoneNumber.toString()).isValid == true,
        {
          message: "The phone number is not correct",
        }
      )
      .optional(),
    password: z.string({ message: "Password is required" }),
    fcmToken: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.email == null && data.phone == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter either phone number or email address",
        path: ["email", "phone"],
      });
    }
  });
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UserLoginZodModel };
