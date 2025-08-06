const { z } = require("zod");

const UpdateLocaleZodModel = z.object({
  default: z.string({ message: "Please enter a name" }).optional(),
  en: z.string({ message: "Please enter an English name" }).optional(),
  ar: z.string({ message: "Please enter an Arabic name" }).optional(),
});
module.exports = { UpdateLocaleZodModel };
