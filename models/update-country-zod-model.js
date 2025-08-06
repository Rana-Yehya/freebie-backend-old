const { z } = require("zod");
const { UpdateLocaleZodModel } = require("./update-locale-zod-model");

const UpdateCountryZodModel = z.object({
  id: z
    .string({
      message: "Please enter a country id",
    })
    .uuid({
      message: "Please enter a valid country id",
    }),
  // avatar      Image?
  // createdAt   DateTime  @default(now())
  // updatedAt   DateTime  @updatedAt
  // imageId     String    @db.ObjectId
  countryName: UpdateLocaleZodModel, //z.string(),
  // .min(3, { message: "Name must be at least 3 characters long" })
  // .max(20, { message: "Name must be at most 20 characters long" }),
  // currencyCode: z
  //   .string()
  //   .min(1, { message: "Name must be at least 1 characters long" })
  //   .max(4, { message: "Name must be at most 4 characters long" }),

  countryIsoCode: z
    .string()
    .min(1, { message: "Name must be at least 1 characters long" })
    .max(4, { message: "Name must be at most 4 characters long" })
    .optional(),

  //
  // gender: z.enum(["male", "female"], { message: "Invalid gender" }),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdateCountryZodModel };
