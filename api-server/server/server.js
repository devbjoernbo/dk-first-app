const compression = require("compression");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

// initialize services
const {
  apolloServer,
  postgreClient,
  redisUtils
} = require("./setup/setup_services");

// initialize app;
const app = express();

// cors config
app.use(cors({ credentials: true, origin: "http://localhost:4000" }));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// using sessions
app.use(
  session({
    name: "session",
    resave: true,
    saveUninitialized: true,
    secret: "sdsewrjuksdfsdf"
  })
);

// use passport
app.use(passport.initialize());
app.use(passport.session());

// compress all responses
app.use(compression());

// use apollo server-middleware
apolloServer.applyMiddleware({
  app,
  path: "/api/graphql",
  cors: { credentials: true, origin: "http://localhost:80" }
});

// Express route handlers
app.get("/", (req, res) => {
  res.send("test");
});

app.get("/api/", (req, res) => {
  res.send("Hi");
});

app.get("/api/values/all", async (req, res) => {
  const values = await postgreClient.query("SELECT * from values");

  res.send(values.rows);
});

app.get("/api/values/current", async (req, res) => {
  const values = await redisUtils.redisClient.hgetall("values");

  res.send(values);
});

app.post("/api/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high a number");
  }

  redisUtils.redisClient.hset("values", index, "Nothing yet!");
  redisUtils.redisPublisher.publish("insert", index);
  postgreClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});

app.listen(3000, function() {
  console.log(`Running API-server at localhost:3000`);
});
