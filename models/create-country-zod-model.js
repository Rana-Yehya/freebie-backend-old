const { z } = require("zod");
const { CreateLocaleZodModel } = require("./create-locole-zod-model");

const CreateCountryZodModel = z.object({
  // avatar      Image?
  // createdAt   DateTime  @default(now())
  // updatedAt   DateTime  @updatedAt
  // imageId     String    @db.ObjectId
  countryName: CreateLocaleZodModel, //z.string(),
  // .min(3, { message: "Name must be at least 3 characters long" })
  // .max(20, { message: "Name must be at most 20 characters long" }),
  // currencyCode: z
  //   .string()
  //   .min(1, { message: "Name must be at least 1 characters long" })
  //   .max(4, { message: "Name must be at most 4 characters long" }),

  countryIsoCode: z
    .string({ message: "Please enter a country iso code" })
    .min(1, { message: "Name must be at least 1 characters long" })
    .max(4, { message: "Name must be at most 4 characters long" }),

  //
  // gender: z.enum(["male", "female"], { message: "Invalid gender" }),
});
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { CreateCountryZodModel };
