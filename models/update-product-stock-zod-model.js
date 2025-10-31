const { z } = require("zod");

const UpdateProductStockZodModel = z
  .object({
    productVariantId: z
      .string({ message: "Please enter a product variant id" })
      .uuid({ message: "Please enter a valid product variant id" })
      .optional(),
    productStockId: z
      .string({ message: "Please enter a product stock id" })
      .uuid({ message: "Please enter a valid product stock id" })
      .optional(),
    stock: z.number().optional(),
    color: z
      .string({ message: "Color is required" })
      .min(6, { message: "Color should be a 6 octal hex digit" })
      .max(6, { message: "Color should be a 6 octal hex digit" })
      .optional(),
    branchId: z
      .string({ message: "Please enter a branch" })
      .uuid({ message: "Please enter a valid branch id" })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.productVariantId == undefined &&
        data.productStockId != undefined) ||
      (data.productVariantId != undefined && data.productStockId == undefined)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Product Stock id or Product variant id is missing",
      });
    }
    if (
      data.productVariantId == undefined &&
      data.productStockId == undefined
    ) {
      if (data.color == undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a color",
        });
      } else if (data.branchId == undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a branch id",
        });
      }
    }
  });
module.exports = { UpdateProductStockZodModel };
