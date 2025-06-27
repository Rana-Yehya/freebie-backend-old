const { z } = require("zod");

const TransactionZodModel = z.object({
  amount: z.number({ message: "Amount is required" }),
  // purpose: z.string({ message: "Purpose of transaction is required" }),
});
module.exports = { TransactionZodModel };
