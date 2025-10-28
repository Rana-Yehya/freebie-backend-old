const { Job, Worker } = require("bullmq");
const { redis } = require("../../config/redis");
const { prisma } = require("../../config/prisma");
const { ChangeType } = require("../../generated/prisma");
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
        const existingDiscount = await prisma.discount.findFirst({
          where: {
            AND: [
              { storeId: storeId },
              { discountStartTime: { lte: new Date() } },
              { discountEndTime: { gte: new Date() } },
            ],
          },
        });
        // console.log("existingDiscount", existingDiscount);

        if (existingDiscount != undefined) {
          await prisma.product.update({
            where: { id: productId },
            data: {
              actualPrice:
                parseFloat(product.price) -
                (parseFloat(product.price) *
                  parseFloat(existingDiscount.discountPercent)) /
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
  removeProductDiscountWorker.on("error", (err) => {
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

        const existingDiscount = await prisma.discount.findFirst({
          where: {
            AND: [
              { storeId: storeId },
              { discountStartTime: { lte: new Date() } },
              { discountEndTime: { gte: new Date() } },
            ],
          },
        });
        if (
          existingDiscount != undefined &&
          existingDiscount.discountPercent >= product.discount.discountPercent
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
  addProductDiscountWorker.on("error", (err) => {
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
  removeStoreDiscountWorker.on("error", (err) => {
    console.error("Worker error:", err);
  });
  return removeStoreDiscountWorker;
}
async function startAddStoreDiscountWorker() {
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
  addStoreDiscountWorker.on("error", (err) => {
    console.error("Worker error:", err);
  });

  return addStoreDiscountWorker;
}
async function startStoreSubscriptionWorker() {
  const storeSubscriptionWorker = new Worker(
    "storeSubscriptionQueue",
    async (job) => {
      const storeId = job.data.storeId;
      const date = new Date();
      const store = await prisma.store.findUnique({
        where: { id: storeId },
        select: { subscription: true },
      });
      const updatedStore = await prisma.store.update({
        where: { id: storeId },
        data: {
          subscription: {
            update: {
              periodEnd: new Date(new Date(date).setMonth(date.getMonth() + 1)),
              maxDiscountCodes: 0,
              notificationsPerWeek: 0,
              adsPerWeek: 0,
              planChanges: {
                create: {
                  changeType: ChangeType.RENEWAL,
                  fromPlan: store.subscription.planLimitId,
                  toPlan: store.subscription.planLimitId,
                  discountCodesUsedThisPeriod:
                    store.subscription.maxDiscountCodes,
                  notificationsUsedThisPeriod:
                    store.subscription.notificationsPerWeek,
                  adsUsedThisPeriod: store.subscription.adsPerWeek,
                  commissionRateUsedThisPeriod:
                    store.subscription.commissionRate,
                },
              },
            },
          },
        },
      });
      console.log("store: ", store);
      console.log("Updated store: ", updatedStore);
    },
    { connection: redis }
  );
  storeSubscriptionWorker.on("progress", (job) => {
    console.log(`Job ${job.id} progress!`);
  });
  storeSubscriptionWorker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
  });

  storeSubscriptionWorker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
  });
  storeSubscriptionWorker.on("error", (err) => {
    console.error("Worker error:", err);
  });
  return storeSubscriptionWorker;
}
function startAllWorkers() {
  console.log("🚀 Starting all BullMQ workers...");

  const workers = [
    startRemoveProductDiscountWorker(),
    startAddProductDiscountWorker(),
    startAddStoreDiscountWorker(),
    startRemoveStoreDiscountWorker(),
    startStoreSubscriptionWorker(),
  ];

  console.log(`✅ All workers started (${workers.length} total)`);

  // Graceful shutdown
  // process.on("SIGTERM", async () => {
  //   console.log("🛑 Shutting down workers gracefully...");
  //   await Promise.all(workers.map((worker) => worker.()));
  //   process.exit(0);
  // });

  // process.on("SIGINT", async () => {
  //   console.log("🛑 Shutting down workers gracefully...");
  //   await Promise.all(workers.map((worker) => worker.close()));
  //   process.exit(0);
  // });
}
startAllWorkers();
