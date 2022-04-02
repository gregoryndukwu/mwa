const mongoose = require("mongoose");
require("../data/games-model")

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
    console.log("Mongoose connected to", process.env.DB_NAME);
})

mongoose.connection.on("disconnected", function () {
    console.log("Mongoose Disconnected")
})

mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error" + err);
});

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGNT_MESSAGE);
        process.exit(0);
    })

})

process.on("SIGTERM", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    })
})

process.once("SIGUSR2", function () {
    mongoose.connection.close(function () {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid, "SIGUSR2");
    });
});