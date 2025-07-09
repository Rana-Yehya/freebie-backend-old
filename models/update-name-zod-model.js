const { z } = require("zod");

const UpdateNameZodModel = z.object({
  defaultName: z.string("Please enter a name").optional(),
  nameEn: z.string("Please enter an English name").optional(),
  nameAr: z.string("Please enter an Arabic name").optional(),
});
module.exports = { UpdateNameZodModel };
