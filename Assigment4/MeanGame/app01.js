require("dotenv").config();
require("./api/data/dbconnection.js").open();
const path = require("path");
const express = require("express");
const routes = require("./api/routes/index");
const app = express();

app.use(function (req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use(express.static(path.join(__dirname,process.env.PUBLIC_FOLDER)));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", routes);

const server = app.listen(process.env.PORT,function () {
      console.log(process.env.MSG_SERVER_START, server.address().port);
   });
