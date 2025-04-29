const { Redis } = require("ioredis");
const redis = new Redis(
  // Number(process.env.UPSTASH_REDIS_PORT) || 6379,

  process.env.UPSTASH_REDIS_REST_URL || "127.0.0.1"
  //  password: process.env.UPSTASH_REDIS_REST_TOKEN,
);

module.exports = { redis };
