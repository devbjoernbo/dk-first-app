// create connection to mongoDB and instantiate mongoose schemas
require("./mongoose/mongo_connection");

// initialize passport authentication
require("./passport/passport_auth");

// import apollo-server
const apolloServer = require("./apollo/apollo_server");
// import postgre-client
const postgreClient = require("./postgres/postgre_client");

// import redis-client
const redisUtils = require("./redis/redis_client");

module.exports = { apolloServer, postgreClient, redisUtils };
