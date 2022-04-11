const mongoose = require("mongoose");
require("../data/db");
const Game = mongoose.model("Game", process.env.GAME_MODEL)


const getOne = function (req, res) {
    console.log("Get One Publisher controller");
    const gameId = req.params.gameId;
    const response = {
        status: 200,
        message: {}
    }

    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Invalid Id");
        response.status = 400;
        response.message = "Invalid gameId";
        return res.status(response.status).json(response.message)
    }

    Game.findById(gameId).select('publisher').exec(function (err, games) {
        if (err) {
            console.log("Error Geting Publisher with gameId")
            response.status = 500;
            response.message = (err);

        } else {
            if (games) {
                console.log("Found Game publisher")
                response.status = 200;
                response.message = games.publisher;
            } else {
                console.log("Game Not Found");
                response.status = 404;
                response.message = "Game with given Id not found";
            }
        }
        return res.status(response.status).json(response.message)
    })


}

const addOne = function (req, res) {
    console.log("Controller to Add one Publisher");

    const response = {
        status: 201,
        message: {}
    };

    let gameId;

    if (req.params && req.params.gameId) {
        gameId = req.params.gameId;
        if (!mongoose.isValidObjectId(gameId)) {
            response.status = 400;
            response.message = "This Game Id Is Invalid";
        }
    } else {
        response.status = 400;
        response.message = "Cannot find without GameID"
    }

    if (response.status != 201) {
        res.status(response.status).json(response.message)
    } else {

        Game.findById(gameId).select("publisher").exec(function (err, game) {
            console.log("Found publisher", game);
            if (err) {
                console.log("Error finding Game");
                response.status = 500;
                response.message = err;
            } else if (!game) {
                console.log("Game with given ID not found" + gameId);
                response.status = 404;
                response.message = { "message": "Game with ID not found" + gameId }
            }
            if (game) {
                _addPublisher(req, res, game, response);
            } else {
                res.status(response.status).json(response.message)
            }

        })

    }


}

const _addPublisher = function (req, res, game, response) {
    console.log("Add one Publisher");
    const name = req.body.name;
    const country = req.body.country;
    const established = req.body.established;

    console.log("The name is " + name + "country is" + country + "established" + established)

    if (name) {
        if (isNaN(name)) {
            game.publisher.name = name;
        } else {
            response.status = 400;
            response.message = "Name must be a string";
        }

    } else {
        response.status = 400;
        response.message = "Name must be filled";
    }

    if (country) {
        if (isNaN(country)) {
            game.publisher.country = country;
        } else {
            response.status = 400;
            response.message = "Country must be filled";
        }
    }
    /*
    if (established) {
        if (isNaN(established)) {
            game.publisher.established = established;
        } else {
            response.status = 400;
            response.message = "Established must be filled";
        }
    } */

    let newPublisher = {
        name: name,
        country: country,
        established: established
    }
    if (response.status != 201) {
        res.status(response.status).json(response.message);
    } else {

        game.publisher.name = req.body.name;
        game.publisher.country = req.body.country;
        game.publisher.established = req.body.established;

        game.save(function (err, game) {

            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.status = 201;
                response.message = game.publisher;
            }
            res.status(response.status).json(response.message);
        });
    }


}


/*
const getOne = function (req, res) {
    console.log("GetOne Publisher controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        console.log("Found publisher ", game.publisher, " for Game ", game);
        res.status(200).json(game);
    });
}
*/
module.exports = {
    getOne: getOne,
    addOne: addOne
}
