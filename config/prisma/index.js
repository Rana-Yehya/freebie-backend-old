const { PrismaClient, Prisma } = require("../../generated/prisma");
// declare global {
//   namespace globalThis {
//     var prismaDb: PrismaClient;
//   }
// }

const prisma = new PrismaClient({
  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
  },
});
// async function postgres() {
//   let productTable = "product";

//   await prisma.$executeRawUnsafe(`
// ALTER TABLE "${productTable}"
// DROP COLUMN IF EXISTS "actualPrice"
//   `);
//   await prisma.$executeRawUnsafe(`
// ALTER TABLE  "${productTable}"
// ADD COLUMN "actualPrice" DOUBLE PRECISION GENERATED ALWAYS AS (
//   CASE
//     WHEN "discountPercent" IS NOT NULL
//       AND "discountStartTime" IS NOT NULL
//       AND "discountEndTime" IS NOT NULL
//       AND NOW() BETWEEN "discountStartTime" AND "discountEndTime"
//     THEN "price" * (1 - "discountPercent")
//     ELSE "price"
//   END
// ) STORED
// `);
// }
// postgres();
// if (process.env.NODE_ENV === 'production') global.prismaDb = prisma;
module.exports = { prisma };
