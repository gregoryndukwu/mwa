require("dotenv").config();
require("./api/data/db");
const bodyParse = require("body-Parser");
const express = require("express");
const route = require("./api/route/route");

const app = express();

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control_Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});
const jsonParser = bodyParse.json();

app.use("/api", jsonParser, route);

const server = app.listen(process.env.PORT, function () {
  console.log(process.env.LISTEN_MESSAGE, server.address().port);
});
