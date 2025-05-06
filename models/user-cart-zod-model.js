const { z } = require("zod");
const { UserProductZodModel } = require("./user-product-zod-model");
const UserCartZodModel = z.object({
  // userCartId: z
  //   .string({ message: "User cart Id is required!" })
  //   .uuid()
  //   .optional(),
  stateId: z.string({ message: "State Id is required!" }).uuid(),
  // userProducts: z
  //   .array(UserProductZodModel, {
  //     message: "User Products can't be empty!",
  //   })
  //   .nonempty({
  //     message: "User Products can't be empty!",
  //   }),
  userProducts: UserProductZodModel,
});
module.exports = { UserCartZodModel };
