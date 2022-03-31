const express = require("express");
const routes = require("./api/routes");
require("dotenv").config();
const app = express();


app.use("/api",routes)


const server = app.listen(process.env.PORT,function () {
    console.log(process.env.MESSAGE, server.address().port);
 });