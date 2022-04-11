const dbConnection = require("../data/dbconnection");
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
require("../data/db")
const Game = mongoose.model("Game", process.env.GAME_MODEL)


const getAll = function (req, res) {

console.log("Get all controller called");




    let offset = 0;
    let count = 5;
    const maxCount = 10;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        console.log("Offset or count is not a number");
        res.status(400).json({ message: "Offset and count must be digits" });
        return;
    }

    if (count > maxCount) {
        //  count = maxCount;
        console.log("Count greater than max");
        res.status(400).json({ message: "Count must be less than 10" });
        return;
    }

    Game.find().skip(offset).limit(count).exec(function (err, game) {
        if (err) {
            console.log("Error reading games");
            res.status(500).json(err);
        } else {
            console.log("Found games", game.length);
            res.json(game);
        }
    });
}



const getOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log(gameId);

    let valid = mongoose.isValidObjectId(gameId);

    console.log(valid)

    if (gameIdIsValid) {

        Game.findById(gameId).exec(function (err, game) {

            if (err) {
                console.log("Error reading Games");
                res.status(500).json(err);
            } else {
                if (game) {
                    console.log("Found game");
                    res.status(200).json(game)
                }
            }


            // res.status(200).json(game);
        });
    } else {
        console.log("Game Id Invalid");
        res.status(400).json({message:"Invalid Game ID"});
    }
}


let addOne = (req, res) => {
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    let newGame = {};

    console.log('title', req.body);
    if (req.body && req.body.minAge && req.body.minPlayers && req.body.title && req.body.price) {

        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.minPlayers = parseInt(req.body.minPlayers);
        newGame.minAge = parseInt(req.body.minAge);

        if (newGame.minAge < 6 || newGame.minAge > 69) {
            res.status(400).json({ msg: "min age must be between 6 and 69" });
        }

        if (newGame.minPlayers < 1 || newGame.minAge > 11) {
            res.status(400).json({ msg: "min players must be between 1 and 11" });
        }

        gamesCollection.insertOne(newGame, (err, savedGame) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(201).json(savedGame);
            }

        });
    } else {
        res.status(400).json({ msg: "title and price not provided" });
    }
};

let deleteOne = (req, res) => {
    let gameId = req.params.gameId;

    const db = dbConnection.get();
    const gamesCollection = db.collection("games");

    gamesCollection.deleteOne({ _id: ObjectId(gameId) }, (err, game) => {
        console.log("Deleted Game");
        res.status(202).json(game);
    });

};

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne
};