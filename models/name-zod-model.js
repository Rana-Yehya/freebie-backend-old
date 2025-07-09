const { z } = require("zod");

const NameZodModel = z.object({
  defaultName: z.string("Please enter a name"),
  nameEn: z.string("Please enter an English name").optional(),
  nameAr: z.string("Please enter an Arabic name").optional(),
});
module.exports = { NameZodModel };
