require("dotenv").config();
const path = require("path");
const express = require("express");
const routes = require("./routes");
const app = express();
app.use(function (req, res, next) {
   console.log(req.method, req.url);
   next();
});
app.use(express.static(path.join(__dirname,process.env.PUBLIC_FOLDER)));

app.use("/", routes);

const server = app.listen(process.env.PORT,function () {
      console.log(process.env.MSG_SERVER_START, server.address().port);
   });
