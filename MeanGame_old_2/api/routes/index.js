const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controllers");
router.route("/games")
   .get(gamesController.gamesGetAll);
module.exports = router;

