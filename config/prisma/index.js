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
// if (process.env.NODE_ENV === 'production') global.prismaDb = prisma;
module.exports = { prisma };
