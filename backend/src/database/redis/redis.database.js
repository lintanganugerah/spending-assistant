const Redis = require("ioredis");
const config = require("@config/index.config");

const createRedisClient = (dbIndex) => {
  return new Redis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    db: dbIndex,
    retryStrategy: (times) => {
      const delay = Math.min(times * config.redis.retryMultiplier, 5000);
      console.log(`Redis (DB ${dbIndex}) is retrying in ${delay / 1000}s`);
      return delay;
    },
  });
};

module.exports = {
  rateLimiterRedis: createRedisClient(0),
  guestRedis: createRedisClient(1),
  userAuthenticatedRedis: createRedisClient(2),
  chatSessionRedis: createRedisClient(10),
};
