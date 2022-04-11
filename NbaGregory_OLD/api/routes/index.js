const express = require("express");
const router = express.Router();
const nbaController = require("../controllers/nba.controller")


console.log("My Route start Here")

router.route("/nba/:nbaId").get(nbaController.nbaGetOne)

router.route("/nba")
.get(nbaController.nbaGetAll)


module.exports = router;
  