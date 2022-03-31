const express = require("express");
require("dotenv").config();
const app = express();
const path= require("path");


app.get("/", function(req, res){
   console.log("Get Receive");
  // res.send("Received your Get request.")
  res.status(404).send("Received your GET request.");

})

 app.get("/json", function(req, res) {
   console.log("JSON request received");
   res.status(200).json({"JSON_Data": true});
 })
   
 app.get("/file", function(req, res) {
   console.log("File request received");
   res.status(200).sendFile(path.join(__dirname, 
   "app22.js"));
   });
   
const server= app.listen(process.env.PORT, function() {
   const port= server.address().port;
   console.log(process.env.MSG_SERVER_START, port);
   });

