const mongoose = require("mongoose");
require("../data/job-model");

const dbName = "meanJobs";
const dburl = "mongodb://localhost:27017/" + dbName;

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function (err) {
  console.log(err);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});

process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});

process.on("SIGUSR2", function () {
  mongoose.connection.close(function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
