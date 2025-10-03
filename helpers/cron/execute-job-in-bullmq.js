const { Job, Worker } = require("bullmq");
const { redis } = require("../../config/redis");
const { prisma } = require("../../config/prisma");
async function startRemoveProductDiscountWorker() {
  const removeProductDiscountWorker = new Worker(
    "removeProductDiscountQueue",
    async (job) => {
      const productId = job.data.productId;
      //TODO check store has discount
      console.log("productId", productId);
      console.log("updatedProduct");

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          actualPrice: null,
          discount: { delete: true },
        },
      });
      console.log(updatedProduct);
      console.log(updatedProduct.actualPrice);

      //console.log(`Job received: ${job.data.message}`);
    },
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

          price: true,
        },
      });
      if (product) {
        //TODO check store has discount

        await prisma.product.update({
          where: { id: productId },
          data: {
            actualPrice:
              parseFloat(product.price) -
              (parseFloat(product.price) *
                parseFloat(product.discount.discountPercent) *
                100) /
                100,
          },
        });
      }
      //console.log(`Job received: ${job.data.message}`);
    },
    { connection: redis }
  );
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
                  every: { branch: { store: discount.storeId } },
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
        console.log(products);
        products.forEach(async (product) => {
          console.log(product.discount);
          console.log(product.discount.discountStartTime <= new Date());
          if (
            product.discount != undefined &&
            product.discount.discountStartTime <= new Date()
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
  return removeStoreDiscountWorker;
}
async function startAddStoreDiscountWorker(params) {
  const addStoreDiscountWorker = new Worker(
    "addStoreDiscountQueue",
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
                  every: { branch: { store: discount.storeId } },
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
        console.log(products);
        products.forEach(async (product) => {
          console.log(product.discount);
          console.log(product.discount.discountStartTime <= new Date());
          if (
            !(
              product.discount != undefined &&
              product.discount.discountStartTime <= new Date() &&
              discount.discountPercent > product.discount.discountPercent
            )
          ) {
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
          } else {
          }
        });
      }
      //console.log(`Job received: ${job.data.message}`);
    },
    { connection: redis }
  );

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
