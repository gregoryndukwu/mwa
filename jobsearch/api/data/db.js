const mongoose = require("mongoose");
require("./job-model.js");

mongoose.connect(process.env.DB_URL);
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to", process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose Disconnected");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error" + err);
});
