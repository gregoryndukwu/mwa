const express = require("express");
require("dotenv").config();
const path = require("path");

const app = express();


app.use("/public", express.static(path.join(__dirname,"public")));
   

 const server = app.listen(process.env.PORT, function(){
    console.log("listen to the port",server.address().port);
 })

