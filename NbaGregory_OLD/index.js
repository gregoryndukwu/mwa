// All requires here
require("dotenv").config();
require("./api/data/db.js");

//Requires inside a const variable
const express = require("express");
const routes = require("./api/routes");
const app = express();

//App Uses came here
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",routes);

//Connect to the serve
const server = app.listen(process.env.PORT, () => {
    const port = server.address().port;
    console.log(process.env.LISTEN_MSG + " "+ process.env.HOST + port);
})