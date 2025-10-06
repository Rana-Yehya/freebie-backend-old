const { z } = require("zod");
const { UpdateLocaleZodModel } = require("./update-locale-zod-model");

const UpdateAdZodModel = z
  .object({
    id: z
      .string({
        message: "Please enter an id",
      })
      .uuid({
        message: "Please enter a valid id",
      }),
    storeId: z
      .string({
        message: "Please enter a store id",
      })
      .uuid({
        message: "Please enter a valid store id",
      }),
    title: UpdateLocaleZodModel,
    description: z.string().optional(),
    image: z
      .any({
        message: "Image is required",
      })
      .refine(
        (file) =>
          [
            "image/png",
            "image/jpeg",
            "image/jpg",
            // "image/svg+xml",
            // "image/gif",
          ].includes(file.mimetype),
        { message: "Ad image is Invalid image file type" }
      )
      .refine((file) => file.size <= 1024 * 1024, {
        message: "Ad image is too large",
      })
      .optional(),
    startDate: z
      .string()
      .datetime({ message: "Invalid Start date time" })
      .refine((discountEndTime) => new Date(discountEndTime) > new Date(), {
        message: "Start date must be in the future",
      })
      .optional(),

    targetType: z
      .string({ message: "Please enter a Target Type" })
      .refine(
        (type) =>
          [
            "store_home",
            "product_page",
            "collection",
            "sale_page",
            "gift_box",
            "featured_products",
          ].includes(type),
        {
          message: "Target Type is not a one of the Target Type keys",
        }
      )
      .optional(),

    productId: z
      .string({
        message: "Please enter a product id",
      })
      .uuid({
        message: "Please enter a valid product id",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.targetType === "product_page" && !data.productId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Product id is required when targetType is product_page",
        path: ["productId"],
      });
    }
  });
module.exports = { UpdateAdZodModel };
