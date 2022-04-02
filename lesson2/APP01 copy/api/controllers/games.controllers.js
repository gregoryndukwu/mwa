const gamesData = require("../data/games.json");
const dbConnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;

module.exports.getOne = function (req, res) {
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    const gameId = req.params.gameId;
    console.log(gameId);
    gamesCollection.findOne({ _id: ObjectId(gameId) }, function (err,
        game) {
        console.log("Found game", game);
        res.status(200).json(game);
    }

    )
}
module.exports.getAll = function (req, res) {
    const db = dbConnection.get();
    const collection = db.collection("games");
    let offset = 3;
    let count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        let number = req.query.count;
        if (number > 10) {
            number = 10;
        }
        count = parseInt(number, 10);
    }
    collection.find().skip(offset).limit(count).toArray(function (err, games) {
        // console.log("Found games", games);
        res.status(200).json(games);
    }

        /*
        gamesCollection.find().toArray(function(err,docs){
            console.log("Found games", docs);
            res.status(200).json(docs);
        }) */
    )
}




module.exports.gamesGetAll = function (req, res) {
    console.log("GET all games");
    console.log(req.query);
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    const pageGames = gamesData.slice(offset, offset + count);
    res.status(200).json(pageGames);
};

module.exports.gamesAddOne = function (req, res) {
    console.log("POST new game");
    console.log(req.body);
    res.status(200).json(req.body);
}