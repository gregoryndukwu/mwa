const express = require("express");

const app = express();

app.set("port",3000);
app.listen(app.get("port"));
console.log("listen to the port",app.get("port"));

