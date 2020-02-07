const keys = require("../keys");
const util = require("util");
const redis = require("redis");

// const redisClient = redis.createClient({
//   host: "redis",
//   port: 6379
// });

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

redisClient.hget = util.promisify(redisClient.hget);
redisClient.hset = util.promisify(redisClient.hset);
redisClient.hgetall = util.promisify(redisClient.hgetall);

module.exports = { redisClient, redisPublisher };
