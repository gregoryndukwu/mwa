const express= require("express");
const app= express();
app.get("/", function(req,res){
    res.write("Testando");
    res.end();
})
app.listen(3000); // Hardcoded more than one place :(
console.log("Listening to port 3000"); // Another place :(


