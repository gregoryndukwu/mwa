const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();


app.post("/json",(req,res) =>{
    res.status(200).json({'message' : 'This is Assigment 2 with Jason Najeeb I got'})
})
app.use("/public", express.static(path.join(__dirname,"public")));
 
  const server = app.listen(process.env.PORT, function(){
     console.log("listen to the port",server.address().port);
  })