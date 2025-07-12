const { z } = require("zod");

const UpdateLocaleZodModel = z.object({
  default: z.string("Please enter a name").optional(),
  en: z.string("Please enter an English name").optional(),
  ar: z.string("Please enter an Arabic name").optional(),
});
module.exports = { UpdateLocaleZodModel };
