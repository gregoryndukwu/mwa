const express = require("express");
require("dotenv").config();

const app = express();

app.get("/" , function(req, res){
   console.log("Get Receive");
})

app.set("port",3000);

 const server = app.listen(process.env.PORT, function(){
    console.log("listen to the port",server.address().port);
 })

