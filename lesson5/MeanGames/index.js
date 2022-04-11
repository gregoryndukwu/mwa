const express = require("express");
require("dotenv").config();
const path = require("path");
require("./api/data/dbconnection").open();
require("./api/data/db");
const app = express();
const routes = require("./api/routes/index");

app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, XRequested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use("/api", routes);

const server = app.listen(process.env.PORT, () => {
  console.log(
    process.env.LISTEN_TO_PORT_MSG + " " + process.env.HOST + process.env.PORT
  );
});
