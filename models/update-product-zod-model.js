const { z } = require("zod");
const { UpdateLocaleZodModel } = require("./update-locale-zod-model");
const {
  UpdateProductStockZodModel,
} = require("./update-product-stock-zod-model");

const UpdateProductZodModel = z
  .object({
    // isAvailable              Boolean   @default(true)
    // isFeatured               Boolean   @default(false)
    // isPopular                Boolean   @default(false)
    id: z
      .string({
        message: "Please enter a product id",
      })
      .uuid({
        message: "Please enter a valid product id",
      }),
    name: UpdateLocaleZodModel,
    mainImage: z
      .any()
      .refine(
        (file) =>
          [
            "image/png",
            "image/jpeg",
            "image/jpg",
            // "image/svg+xml",
            // "image/gif",
          ].includes(file.mimetype),
        { message: "Banner is Invalid image file type" }
      )
      .refine((file) => file.size <= 1024 * 1024, {
        message: "Banner image is too large",
      })
      .optional(),
    image: z
      .array(
        z
          .any()
          .refine(
            (file) =>
              [
                "image/png",
                "image/jpeg",
                "image/jpg",
                // "image/svg+xml",
                // "image/gif",
              ].includes(file.mimetype),
            { message: "Banner is Invalid image file type" }
          )
          .refine((file) => file.size <= 1024 * 1024, {
            message: "Banner image is too large",
          }),
        {
          message: "Images can't be empty!",
        }
      )
      .nonempty({
        message: "Images can't be empty!",
      })
      .optional(),
    description: UpdateLocaleZodModel, // z.string({ message: "Description is required" }).optional(),
    detailedDescription: UpdateLocaleZodModel,
    // z
    //   .string({
    //     message: "Detailed Description is required",
    //   })
    //   .optional(),
    price: z
      .string()
      .refine((price) => parseFloat(price) > 0, {
        message: "Price is not a number or it is less than zero",
      })
      .optional(),
    //{ message: "Does need preparation is required" }
    doesNeedPreparation: z
      .string()
      .refine(
        (doesNeedPreparation) =>
          doesNeedPreparation === "true" || doesNeedPreparation === "false",
        {
          message: "Need Preparation property does not equal to true or false",
        }
      )
      .optional(),
    //{ message: "Is available is required" }
    isAvailable: z
      .string()
      .refine(
        (isAvailable) => isAvailable === "true" || isAvailable === "false",
        {
          message: "Available property does not equal to true or false",
        }
      )
      .optional(),
    // isFeatured: z
    //   .string()
    //   .refine((isFeatured) => isFeatured === "true" || isFeatured === "false", {
    //     message: "Featured property does not equal to true or false",
    //   })
    //   .default("false")
    //   .optional(),
    // isPopular: z
    //   .string()
    //   .refine((isPopular) => isPopular === "true" || isPopular === "false", {
    //     message: "Popular property does not equal to true or false",
    //   })
    //   .default("false")
    //   .optional(),
    canBeDeliveredOutsideState: z
      .string()
      .refine(
        (canBeDeliveredOutsideState) =>
          canBeDeliveredOutsideState === "true" ||
          canBeDeliveredOutsideState === "false",
        {
          message:
            "Availablity to deliver outside the state does not equal to true or false",
        }
      )
      .optional(),
    preparationTimeInMinutes: z.string().optional(),
    discountPercent: z
      .string()
      .refine(
        (discountPercent) =>
          parseInt(discountPercent) > 0 && parseInt(discountPercent) < 100,
        {
          message:
            "Discount Percent is not a number or it is less than zero or it is bigger than 100",
        }
      )
      .optional(),
    discountStartTime: z
      .string()
      .datetime({ message: "Invalid discount start time" })
      .refine((discountStartTime) => new Date(discountStartTime) > new Date(), {
        message: "Discount start time must be in the future",
      })
      .optional(),
    discountEndTime: z
      .string()
      .datetime({ message: "Invalid discount end time" })
      .refine((discountEndTime) => new Date(discountEndTime) > new Date(), {
        message: "Discount end time must be in the future",
      })
      .optional(),

    categoryId: z.string({ message: "Category is required" }).optional(),
    occasions: z
      .array(z.string({ message: "Occasion must be a string" }), {
        message: "Occasions can't be empty",
      })
      // .nonempty({
      //   message: "Occasions can't be empty!",
      // })
      .optional(),

    /*
      {
        message: "Branches can't be empty!",
      }
      */
    productStock: z
      .array(UpdateProductStockZodModel)
      // .nonempty({
      //   message: "Branches can't be empty!",
      // })
      .optional(),
    dimensionsWCm: z
      .string({ message: "Dimensions Width is required" })
      .refine((dimensionsWCm) => parseFloat(dimensionsWCm) > 0, {
        message: "Dimensions Width is not a number or it is less than zero",
      })
      .optional(),

    dimensionsHCm: z
      .string({ message: "Dimensions Height is required" })
      .refine((dimensionsHCm) => parseFloat(dimensionsHCm) > 0, {
        message: "Dimensions Height is not a number or it is less than zero",
      })
      .optional(),

    //z.number({ message: "Dimensions Height is required" }),
    dimensionsLCm: z
      .string({ message: "Dimensions Length is required" })
      .refine((dimensionsLCm) => parseFloat(dimensionsLCm) > 0, {
        message: "Dimensions Length is not a number or it is less than zero",
      })
      .optional(),
    weightInKg: z
      .string({ message: "Weight(Kg) is required" })
      .refine((price) => parseFloat(price) > 0, {
        message: "Weight(Kg) is not a number or it is less than zero",
      })
      .optional(),

    //{ message: "Is deleted is required" }
    // isDeleted: z.boolean().default(false),
    //{ message: "Is deleted is required" }
    // isDeleted: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.stock <= 0 || (data.stock > 0 && data.isAvailable === false)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Stock must be greater than 0 and isAvailable must be true",
        path: ["stock", "isAvailable"],
      });
    }
    // if (
    //   data.dimensionsWCm <= 1 ||
    //   data.dimensionsHCm <= 1 ||
    //   data.dimensionsLCm <= 1
    // ) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message:
    //       "Dimensions must be greater than 1. Please add estimated value(s)",
    //     path: ["dimensionsWCm", "dimensionsHCm", "dimensionsLCm"],
    //   });
    // }
    if (data.productStock) {
      for (
        let productStockIndex = 0;
        productStockIndex < data.productStock.length;
        productStockIndex++
      ) {
        if (
          (data.productStock[productStockIndex].stock <= 0 ||
            data.productStock[productStockIndex].stock === undefined) &&
          data.doesNeedPreparation == false
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Stock must be greater than 0",
            path: ["stock"],
          });
        }
      }
    }
    if (data.discountPercent) {
      // if (
      //   !(
      //     parseInt(data.discountPercent).T >= 0 &&
      //     parseFloat(data.discountPercent) <= 100
      //   )
      // ) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message:
      //       "Discount Percent is not a number or it is less than zero or it is bigger than 100",

      //     path: ["discountPercent"],
      //   });
      // }
      if (
        data.discountStartTime === undefined ||
        data.discountEndTime === undefined ||
        data.discountStartTime === null ||
        data.discountEndTime === null
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount start time and end time must be provided",
          path: ["discountStartTime", "discountEndTime"],
        });
      }
      const discountStartTime = new Date(data.discountStartTime);
      const discountEndTime = new Date(data.discountEndTime);

      if (discountStartTime > discountEndTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount start time must be before discount end time",
          path: ["discountStartTime", "discountEndTime"],
        });
      }
    }
    if (
      data.doesNeedPreparation == true &&
      data.preparationTimeInMinutes == 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Preparation time is required if product needs preparation is true",
        path: ["preparationTime"],
      });
    }

    if (
      data.doesNeedPreparation == false &&
      data.preparationTimeInMinutes != 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Preparation time is not required if product needs preparation is false",
        path: ["preparationTime"],
      });
    }
  });
// type UserModel = z.infer<typeof CreateUserZodModel>;
module.exports = { UpdateProductZodModel };
