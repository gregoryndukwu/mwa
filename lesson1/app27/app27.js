const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
//const routes = require("./routes")



// Teacher Insights - Begin
app.use(function(req,res, next){
   console.log(req.method, req.url)
   next();
})

// Teacher Insights - End

//app.use("/",routes);

app.use("/public", express.static(path.join(__dirname,"public")));


 
  const server = app.listen(process.env.PORT, function(){
     console.log("listen to the port",server.address().port);
  })