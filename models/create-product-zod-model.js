const { z } = require("zod");
const { ProductStockZodModel } = require("./product-stock-zod-model");

const CreateProductZodModel = z
  .object({
    // isAvailable              Boolean   @default(true)
    // isFeatured               Boolean   @default(false)
    // isPopular                Boolean   @default(false)
    name: z.string({ message: "Name is required" }),
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
      }),
    description: z.string({ message: "Description is required" }),
    detailedDescription: z.string({
      message: "Detailed Description is required",
    }),
    price: z
      .string({ message: "Price is required" })
      .refine((price) => parseFloat(price) > 0, {
        message: "Price is not a number or it is less than zero",
      }),
    //      .number({ message: "Price is required" })
    //{ message: "Does need preparation is required" }
    doesNeedPreparation: z.boolean().default(false),
    //{ message: "Is available is required" }
    isAvailable: z.boolean().default(true),
    preparationTimeInMinutes: z.number().default(0),
    discountPrecent: z.number().default(0),
    discountStartTime: z.string().date().optional(),
    discountEndTime: z.string().date().optional(),
    // color: z.array(
    //   z
    //     .string()
    //     .min(6, { message: "Color should be a 6 octal hex digit" })
    //     .max(6, { message: "Color should be a 6 octal hex digit" }),
    //   {
    //     message: "Product must be in at least one color",
    //   }
    // ),

    // .superRefine((data, ctx) => {
    //   if (
    //     data.color === undefined ||
    //     data.color.isEmpty ||
    //     data.color === null
    //   ) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Product must be in at least one color",
    //       path: ["color"],
    //     });
    //   }
    // }),
    // stock: z.number().optional(),
    categoryId: z.string({ message: "Category Id is required" }),
    occasionId: z
      .array(z.string({ message: "Occasion Id must be a string" }), {
        message: "Occasions can't be empty!",
      })
      .nonempty({
        message: "Occasions can't be empty!",
      })
      .optional(),
    productStock: z
      .array(ProductStockZodModel, {
        message: "Branches can't be empty!",
      })
      .nonempty({
        message: "Branches can't be empty!",
      }),
    dimensionsWCm: z
      .string({ message: "Dimensions Width is required" })
      .refine((price) => parseFloat(price) > 0, {
        message: "Dimensions Width is not a number or it is less than zero",
      }),
    dimensionsHCm: z
      .string({ message: "Dimensions Height is required" })
      .refine((price) => parseFloat(price) > 0, {
        message: "Dimensions Height is not a number or it is less than zero",
      }),
    //z.number({ message: "Dimensions Height is required" }),
    dimensionsLCm: z
      .string({ message: "Dimensions Length is required" })
      .refine((price) => parseFloat(price) > 0, {
        message: "Dimensions Length is not a number or it is less than zero",
      }),
    // z.number({ message: "Dimensions Length is required" }),
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

    if (data.discountPrecent < 0 || data.discountPrecent >= 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Discount must be between 0 and 100",
        path: ["discountPrecent"],
      });
    }
    if (data.discountPrecent > 0) {
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
      const discountStartTime = new Date(Date.parse(data.discountStartTime));
      const discountEndTime = new Date(Date.parse(data.discountEndTime));

      if (discountStartTime >= discountEndTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount start time must be before discount end time",
          path: ["discountStartTime", "discountEndTime"],
        });
      }
      if (discountStartTime < new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount start time must be in the future",
          path: ["discountStartTime"],
        });
      }
      if (discountEndTime < new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount end time must be in the future",
          path: ["discountEndTime"],
        });
      }
      if (discountStartTime > discountEndTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount start time must be before discount end time",
          path: ["discountStartTime", "discountEndTime"],
        });
      }
    }

    if (data.price <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Price must be greater than 0",
        path: ["price"],
      });
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
// type UserModel = z.infer<typeof UserZodModel>;
module.exports = { CreateProductZodModel };
