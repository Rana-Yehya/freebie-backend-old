const { CronJob } = require("cron");
const { prisma } = require("../../config/prisma");

new CronJob(
  "0 0 */24 * * *", // cronTime
  async function () {
    const productPrice = await prisma.productPrice.findMany({});
    productPrice.forEach(async (product) => {
      if (product.discountEndTime < new Date()) {
        await prisma.productPrice.delete({
          where: {
            productId: product.productId,
          },
        });
      }
    });
  }, // onTick
  null, // onComplete
  true // start
);
