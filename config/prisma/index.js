const { PrismaClient } = require("../../generated/prisma");
// declare global {
//   namespace globalThis {
//     var prismaDb: PrismaClient;
//   }
// }

const prisma = new PrismaClient();
// if (process.env.NODE_ENV === 'production') global.prismaDb = prisma;
module.exports = { prisma };
