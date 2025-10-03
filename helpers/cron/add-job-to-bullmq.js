const { Queue } = require("bullmq");
const { redis } = require("../../config/redis");

async function removeProductDiscountQueue({ productId, delay }) {
  console.log("Remove Product Discount to queue...");
  const myQueue = new Queue("removeProductDiscountQueue", {
    connection: redis,
  });
  console.log(new Date());
  console.log("Delay in Remove", delay);
  const calculatedDelay = delay - new Date();
  console.log("Calculated Delay in Remove", calculatedDelay);
  await myQueue.add(
    "removeProductDiscountJob",
    { productId: productId }, // job data
    { delay: calculatedDelay } // delay in ms (10 sec)
  );

  console.log(
    "Remove Product Discount scheduled with",
    calculatedDelay,
    "delay."
  );
}

async function addProductDiscountQueue({ productId, delay }) {
  console.log("Add Product Discount to queue...");
  const myQueue = new Queue("addProductDiscountQueue", { connection: redis });
  console.log("Delay in Add", delay);
  const calculatedDelay = delay - new Date();
  console.log("Calculated Delay in Add", calculatedDelay);
  await myQueue.add(
    "addProductDiscountJob",
    { productId: productId }, // job data
    { delay: calculatedDelay } // delay in ms (10 sec)
  );

  console.log("Add Product Discount scheduled with", calculatedDelay, "delay.");
}

async function addStoreDiscountQueue({ discountId, delay }) {
  console.log("Add Store Discount to queue...");
  const myQueue = new Queue("addStoreDiscountQueue", { connection: redis });
  const calculatedDelay = delay - new Date();
  await myQueue.add(
    "addStoreDiscountJob",
    { discountId: discountId }, // job data
    { delay: calculatedDelay } // delay in ms (10 sec)
  );

  console.log("Add Store Discount scheduled with", calculatedDelay, "delay.");
}

async function removeStoreDiscountQueue({ discountId, delay }) {
  console.log("Remove Store Discount to queue...");
  const myQueue = new Queue("removeStoreDiscountQueue", {
    connection: redis,
  });
  const calculatedDelay = delay - new Date();
  console.log(calculatedDelay);
  await myQueue.add(
    "removeStoreDiscountJob",
    { discountId: discountId }, // job data
    { delay: calculatedDelay } // delay in ms (10 sec)
  );

  console.log(
    "Remove Store Discount scheduled with",
    calculatedDelay,
    "delay."
  );
}

module.exports = {
  addProductDiscountQueue,
  removeProductDiscountQueue,
  removeStoreDiscountQueue,
  addStoreDiscountQueue,
};
