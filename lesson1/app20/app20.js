const express = require("express");
const app = express();
app.set("port", 3000);
const server = app.listen(app.get("port"), function () {
   const port = server.address().port; // Get port from app
   console.log("Listening to port " + port);
});