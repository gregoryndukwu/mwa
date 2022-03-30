const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", function(req, res){
    console.log("Get Receive");
    res.status(404).send("Received your GET request.");
 })
 
 app.set("port",3000);
 
  const server = app.listen(process.env.PORT, function(){
     console.log("listen to the port",server.address().port);
  })