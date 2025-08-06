const { z } = require("zod");

const StoreStatusZodModel = z.object({
  storeId: z
    .string({
      message: "Please enter a store id",
    })
    .uuid({
      message: "Please enter a valid store id",
    }),
  status: z
    .string({ message: "Please enter a status" })
    .refine(
      (status) =>
        ["pending", "approved", "frozen", "banned", "deleted"].includes(status),
      {
        message: "Status is not a one of the status keys",
      }
    ), //work hours
});
module.exports = { StoreStatusZodModel };
