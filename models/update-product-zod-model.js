const { z } = require("zod");
const { ProductStockZodModel } = require("./product-stock-zod-model");

const UpdateProductZodModel = z
  .object({
    // isAvailable              Boolean   @default(true)
    // isFeatured               Boolean   @default(false)
    // isPopular                Boolean   @default(false)
    name: z.string().optional(),
    image: z
      .array(z.string({ message: "Image is required" }))
      .nonempty({
        message: "Images can't be empty!",
      })
      .optional(),
    description: z.string({ message: "Description is required" }).optional(),
    detailedDescription: z
      .string({
        message: "Detailed Description is required",
      })
      .optional(),
    price: z.number({ message: "Price is required" }).optional(),
    //{ message: "Does need preparation is required" }
    doesNeedPreparation: z.boolean().default(false).optional(),
    //{ message: "Is available is required" }
    isAvailable: z.boolean().default(true).optional(),
    preparationTimeInMinutes: z.number().default(0).optional(),
    discountPrecent: z.number().default(0).optional(),
    discountStartTime: z.string().date().optional(),
    discountEndTime: z.string().date().optional(),
    // color: z
    //   .array(
    //     z
    //       .string()
    //       .min(6, { message: "Color should be a 6 octal hex digit" })
    //       .max(6, { message: "Color should be a 6 octal hex digit" }),
    //     {
    //       message: "Product must be in at least one color",
    //     }
    //   )
    //   .optional(),

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
    categoryId: z.string({ message: "Category Id is required" }).optional(),
    occasionId: z
      .array(
        z.string({ message: "Occasion Id must be a string" })
        // {
        //   message: "Occasions can't be empty!",
        // },
      )
      .optional(),
    productStock: z
      .array(ProductStockZodModel, {
        message: "Branches can't be empty!",
      })
      .optional(),
    dimensionsWCm: z
      .number({ message: "Dimensions Width is required" })
      .optional(),
    dimensionsHCm: z
      .number({ message: "Dimensions Height is required" })
      .optional(),
    dimensionsLCm: z
      .number({ message: "Dimensions Length is required" })
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
    if (
      data.dimensionsWCm <= 1 ||
      data.dimensionsHCm <= 1 ||
      data.dimensionsLCm <= 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Dimensions must be greater than 1. Please add estimated value(s)",
        path: ["dimensionsWCm", "dimensionsHCm", "dimensionsLCm"],
      });
    }

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

    if (data.discountPrecent >= 0 && data.discountPrecent >= 100) {
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
      if (discountStartTime < new Date.now()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Discount start time must be in the future",
          path: ["discountStartTime"],
        });
      }
      if (discountEndTime < new Date.now()) {
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
module.exports = { UpdateProductZodModel };
