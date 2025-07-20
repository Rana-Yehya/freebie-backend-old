const { z } = require("zod");
const { LocaleZodModel } = require("./locole-zod-model");

const CountryZodModel = z.object({
  // avatar      Image?
  // createdAt   DateTime  @default(now())
  // updatedAt   DateTime  @updatedAt
  // imageId     String    @db.ObjectId
  countryName: LocaleZodModel, //z.string(),
  // .min(3, { message: "Name must be at least 3 characters long" })
  // .max(20, { message: "Name must be at most 20 characters long" }),
  // currencyCode: z
  //   .string()
  //   .min(1, { message: "Name must be at least 1 characters long" })
  //   .max(4, { message: "Name must be at most 4 characters long" }),

  countryIsoCode: z
    .string()
    .min(1, { message: "Name must be at least 1 characters long" })
    .max(4, { message: "Name must be at most 4 characters long" }),

  //
  // gender: z.enum(["male", "female"], { message: "Invalid gender" }),
});
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { CountryZodModel };
