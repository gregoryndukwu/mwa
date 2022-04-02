
const mongoose = require("mongoose");
require("../data/db");
const Game = mongoose.model("Game",process.env.GAME_MODEL)

const getOne = function (req, res) {
    console.log("GetOne Publisher controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        console.log("Found publisher ", game.publisher, " for Game ", game);
        res.status(200).json(game);
    });
}
module.exports = {
    getOne: getOne
}
