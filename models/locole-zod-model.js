const { z } = require("zod");

const LocaleZodModel = z.object({
  default: z.string("Please enter a name"),
  en: z.string("Please enter an English name").optional(),
  ar: z.string("Please enter an Arabic name").optional(),
});
module.exports = { LocaleZodModel };
