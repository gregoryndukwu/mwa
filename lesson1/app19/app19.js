const express= require("express");
const app= express();
app.set("port", 3000); // In one place
app.listen(app.get("port"));
console.log("Listening to port "+ app.get("port"));



