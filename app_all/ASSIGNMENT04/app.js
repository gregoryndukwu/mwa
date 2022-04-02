const express = require("express");
require("dotenv").config();
const path = require("path");
require("./data/dbconnection").open();
const app = express();
const routes = require("./routes/index");


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api",routes);

const server = app.listen(process.env.PORT, () => {
    const port = server.address().port;
    console.log(process.env.LISTEN_TO_PORT_MSG + " " + process.env.HOST + port);
});