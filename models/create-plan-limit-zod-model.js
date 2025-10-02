const { z } = require("zod");

const CreatePlanLimitZodModel = z.object({
  planName: z
    .string({ message: "Please enter a Plan Name" })
    .refine(
      (status) => ["basic", "sliver", "gold", "diamond"].includes(status),
      {
        message: "Plan Name is not a one of the status keys",
      }
    ),
  maxProducts: z
    .number({ message: "Max Products is required" })
    .refine((max) => parseFloat(max) > 0, {
      message: "Max Products is less than zero",
    })
    .default(50),
  maxBranches: z
    .number({ message: "Max Branches is required" })
    .refine((max) => parseFloat(max) > 0, {
      message: "Max Branches is less than zero",
    })
    .default(2),
  notificationsPerWeek: z
    .number({ message: "Notifications Per Week is required" })
    .refine((max) => parseFloat(max) >= 0, {
      message: "Notifications Per Week is not a number or it is less than zero",
    })
    .default(0),
  maxDiscountCodes: z
    .number({ message: "Max Discount Codes is required" })
    .refine((max) => parseFloat(max) >= 0, {
      message: "Max Discount Codes is less than zero",
    })
    .default(0),

  adsPerWeek: z
    .number({ message: "Ads Per Week is required" })
    .refine((max) => parseFloat(max) >= 0, {
      message: "Ads Per Week is less than zero",
    })
    .default(0),

  allowsBoxes: z
    .boolean({ message: "Allows Boxes is required" })
    .default(false),
  allowsCollaborations: z
    .boolean({
      message: "Allows Collaborations is required",
    })
    .default(false),
  // .refine(
  //   (allowsCollaborations) =>
  //     allowsCollaborations === "true" || allowsCollaborations === "false",
  //   {
  //     message: "Allows Collaborations does not equal to true or false",
  //   }
  // )
  // .default("false"),
  commissionRate: z
    .number({ message: "Commission Rate is required" })
    .refine((max) => parseFloat(max) >= 0 && parseFloat(max) < 100, {
      message: "Commission Rate is less than zero and bigger than one",
    })
    .default(0),
});
module.exports = { CreatePlanLimitZodModel };
