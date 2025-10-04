const { Job, Worker } = require("bullmq");
const { redis } = require("../../config/redis");
const { prisma } = require("../../config/prisma");
async function startRemoveProductDiscountWorker() {
  const removeProductDiscountWorker = new Worker(
    "removeProductDiscountQueue",
    async (job) => {
      const productId = job.data.productId;
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: {
          price: true,
          discount: true,
          productVariant: {
            select: {
              productStock: {
                select: {
                  branch: {
                    select: {
                      store: {
                        select: {
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (product) {
        const storeId =
          product.productVariant[0].productStock[0].branch.store.id;
        // console.log("storeId", storeId);
        const exuistingDiscount = await prisma.discount.findFirst({
          where: {
            AND: [
              { storeId: storeId },
              { discountStartTime: { lte: new Date() } },
              { discountEndTime: { gte: new Date() } },
            ],
          },
        });
        // console.log("exuistingDiscount", exuistingDiscount);

        if (exuistingDiscount != undefined) {
          await prisma.product.update({
            where: { id: productId },
            data: {
              actualPrice:
                parseFloat(product.price) -
                (parseFloat(product.price) *
                  parseFloat(exuistingDiscount.discountPercent)) /
                  100,
              discount: { delete: true },
            },
          });
        } else {
          await prisma.product.update({
            where: { id: productId },
            data: {
              actualPrice: null,
              discount: { delete: true },
            },
          });
        }
      }
    },
    //console.log(`Job received: ${job.data.message}`);

    { connection: redis }
  );

  removeProductDiscountWorker.on("progress", (job) => {
    console.log(`Job ${job.id} progress!`);
  });
  removeProductDiscountWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
  });

  removeProductDiscountWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
  });
  removeProductDiscountWorker.on("error", (job) => {
    console.error("Worker error:", err);
  });

  return removeProductDiscountWorker;
}
async function startAddProductDiscountWorker() {
  const addProductDiscountWorker = new Worker(
    "addProductDiscountQueue",
    async (job) => {
      const productId = job.data.productId;
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: {
          id: true,
          discount: true,
          productVariant: {
            select: {
              productStock: {
                select: {
                  branch: {
                    select: { store: { select: { id: true } } },
                  },
                },
              },
            },
          },
          price: true,
        },
      });
      if (product) {
        const storeId =
          product.productVariant[0].productStock[0].branch.store.id;

        const exuistingDiscount = await prisma.discount.findFirst({
          where: {
            AND: [
              { storeId: storeId },
              { discountStartTime: { lte: new Date() } },
              { discountEndTime: { gte: new Date() } },
            ],
          },
        });
        if (
          exuistingDiscount != undefined &&
          exuistingDiscount.discountPercent >= product.discount.discountPercent
        ) {
        } else {
          await prisma.product.update({
            where: { id: productId },
            data: {
              actualPrice:
                parseFloat(product.price) -
                (parseFloat(product.price) *
                  parseFloat(product.discount.discountPercent)) /
                  100,
            },
          });
        }
      }
      //console.log(`Job received: ${job.data.message}`);
    },
    { connection: redis }
  );
  addProductDiscountWorker.on("progress", (job) => {
    console.log(`Job ${job.id} progress!`);
  });
  addProductDiscountWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
  });

  addProductDiscountWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
  });
  addProductDiscountWorker.on("error", (job) => {
    console.error("Worker error:", err);
  });
  return addProductDiscountWorker;
}
async function startRemoveStoreDiscountWorker() {
  const removeStoreDiscountWorker = new Worker(
    "removeStoreDiscountQueue",
    async (job) => {
      const discountId = job.data.discountId;
      const discount = await prisma.discount.findFirst({
        where: { id: discountId },
      });
      if (discount) {
        const products = await prisma.product.findMany({
          where: {
            productVariant: {
              every: {
                productStock: {
                  every: { branch: { storeId: discount.storeId } },
                },
              },
            },
          },
          select: {
            id: true,
            price: true,
            discount: {
              select: {
                discountEndTime: true,
                discountPercent: true,
                discountStartTime: true,
              },
            },
          },
        });
        // console.log(products);
        products.forEach(async (product) => {
          // console.log(product.discount);
          // console.log(
          //   product.discount != undefined &&
          //     product.discount.discountStartTime <= new Date() &&
          //     product.discount.discountEndTime > new Date()
          // );
          // console.log(product.discount.discountStartTime <= new Date());
          // console.log(product.discount.discountEndTime > new Date());
          // console.log(product.discount.discountStartTime <= new Date());
          if (
            product.discount != undefined &&
            product.discount.discountStartTime <= new Date() &&
            product.discount.discountEndTime > new Date()
          ) {
            await prisma.product.update({
              where: { id: product.id },
              data: {
                actualPrice:
                  parseFloat(product.price) -
                  (parseFloat(product.price) *
                    parseFloat(product.discount.discountPercent)) /
                    100,
              },
            });
          } else {
            await prisma.product.update({
              where: { id: product.id },
              data: {
                actualPrice: null,
              },
            });
          }
        });
      }
      //console.log(`Job received: ${job.data.message}`);
    },
    { connection: redis }
  );
  removeStoreDiscountWorker.on("progress", (job) => {
    console.log(`Job ${job.id} progress!`);
  });
  removeStoreDiscountWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
  });

  removeStoreDiscountWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
  });
  removeStoreDiscountWorker.on("error", (job) => {
    console.error("Worker error:", err);
  });
  return removeStoreDiscountWorker;
}
async function startAddStoreDiscountWorker(params) {
  const addStoreDiscountWorker = new Worker(
    "addStoreDiscountQueue",
    async (job) => {
      const discountId = job.data.discountId;
      // console.log("discountId:", discountId);
      const discount = await prisma.discount.findUnique({
        where: { id: discountId },
      });
      // console.log("discount:", discount);

      if (discount) {
        const products = await prisma.product.findMany({
          where: {
            productVariant: {
              every: {
                productStock: {
                  every: { branch: { storeId: discount.storeId } },
                },
              },
            },
          },
          select: {
            id: true,
            price: true,
            discount: true,
          },
        });
        products.forEach(async (product) => {
          // console.log(product.discount.discountStartTime <= new Date());
          // console.log(product.discount);
          // console.log(product.discount.discountEndTime > new Date());
          // console.log(discount.discountPercent);
          // console.log(product.discount.discountPercent);
          // console.log(
          //   discount.discountPercent > product.discount.discountPercent
          // );
          // console.log(
          //   product.discount != undefined &&
          //     product.discount.discountStartTime <= new Date() &&
          //     product.discount.discountEndTime > new Date() &&
          //     discount.discountPercent > product.discount.discountPercent
          // );
          if (
            product.discount != undefined &&
            product.discount.discountStartTime <= new Date() &&
            product.discount.discountEndTime > new Date() &&
            product.discount.discountPercent > discount.discountPercent
          ) {
          } else {
            console.log(
              "Actual Price:",
              parseFloat(product.price) -
                (parseFloat(product.price) *
                  parseFloat(discount.discountPercent)) /
                  100
            );
            await prisma.product.update({
              where: { id: product.id },
              data: {
                actualPrice:
                  parseFloat(product.price) -
                  (parseFloat(product.price) *
                    parseFloat(discount.discountPercent)) /
                    100,
              },
            });
          }
        });
      }
      //console.log(`Job received: ${job.data.message}`);
    },
    { connection: redis }
  );

  addStoreDiscountWorker.on("progress", (job) => {
    console.log(`Job ${job.id} progress!`);
  });
  addStoreDiscountWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
  });

  addStoreDiscountWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
  });
  addStoreDiscountWorker.on("error", (job) => {
    console.error("Worker error:", err);
  });

  return addStoreDiscountWorker;
}

function startAllWorkers() {
  console.log("🚀 Starting all BullMQ workers...");

  const workers = [
    startRemoveProductDiscountWorker(),
    startAddProductDiscountWorker(),
    startAddStoreDiscountWorker(),
    startRemoveStoreDiscountWorker(),
  ];

  console.log(`✅ All workers started (${workers.length} total)`);

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    console.log("🛑 Shutting down workers gracefully...");
    await Promise.all(workers.map((worker) => worker.close()));
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    console.log("🛑 Shutting down workers gracefully...");
    await Promise.all(workers.map((worker) => worker.close()));
    process.exit(0);
  });
}
startAllWorkers();
