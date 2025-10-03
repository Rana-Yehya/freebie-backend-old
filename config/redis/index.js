const { Redis } = require("ioredis");
// const redis = new Redis(
//   // Number(process.env.UPSTASH_REDIS_PORT) || 6379,

//   process.env.REDIS_REST_URL

//   //  password: process.env.UPSTASH_REDIS_REST_TOKEN,
// );

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  // username: process.env.REDIS_USERNAME, // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});
module.exports = { redis };
