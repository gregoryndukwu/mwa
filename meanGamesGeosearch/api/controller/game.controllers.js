const mongoose = require("mongoose");
const helpers = require("./callbacksAndValidations");
require("dotenv").config();
const Game = mongoose.model(process.env.GAME_MODEL);

module.exports.getAll = function (req, res) {
  if (req.query && req.query.lat && req.query.lng) {
    _runGeoQuery(req, res);
    return;
  }
  const response = {
    status: 200,
    message: {},
  };
  let offset = req.query.offset || 0;
  let count = req.query.count || 5;
  if (count > 10) {
    response["status"] = 400;
    response["message"] = {
      message: "count out of range, should be less than 10 and more than 0",
    };
  } else
    Game.find()
      .skip(offset)
      .limit(count)
      .exec((err, games) =>
        helpers.getCallback(err, games, res, response, "Games found :", 200)
      );
};

_runGeoQuery = function (req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const point = { type: "Point", coordinates: [lng, lat] };
  const query = {
    "publisher.location.coordinates": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [-79.35393775960023, 43.78026985716867],
          $minDistance: 0,
          $maxDistance: 1000,
        },
      },
    },
  };
  Game.find(query)
    .skip()
    .limit()
    .exec((err, games) =>
      helpers.getCallback(err, games, res, response, "games found: ", 200)
    );
};

module.exports.getOne = function (req, res) {
  const expectedStatus = 200;
  const response = { status: 200, message: {} };
  const gameID = req.params.gameID;

  if (helpers.checkID(gameID, response))
    Game.findById(gameID).exec((err, games) =>
      helpers.getCallback(
        err,
        games,
        res,
        response,
        "Game founded : ",
        expectedStatus
      )
    );
};

module.exports.insertOne = function (req, res) {
  const response = { status: 201, message: {} };
  if (!req.body || !req.body.titile) {
    response["status"] = 404;
    response["message"] = { message: "Not all required fields provieded." };
  }
  if (req.body && req.body.title) {
    let newGame = {
      title: req.body.title,
    };
    if (req.body.year) {
      newGame["year"] = req.body.year;
    }
    if (req.body.rate) {
      newGame["rate"] = req.body.rate;
    }
    if (req.body.price) {
      newGame["price"] = req.body.price;
    }
    if (req.body.minPlayers) {
      newGame["minPlayers"] = req.body.minPlayers;
    }
    if (req.body.maxPlayers) {
      newGame["maxPlayers"] = req.body.maxPlayers;
    }
    if (req.body.minAge) {
      newGame["minAge"] = req.body.minAge;
    }
    if (req.body.designers) {
      newGame["designers"] = req.body.designers;
    }
    if (req.body.reviews) {
      newGame["reviews"] = req.body.reviews;
    }

    if (req.body.publisher) {
      const newPublisher = {
        name: req.body.publisher.name || "",
        country: req.body.publisher.country || "",
        established: parseInt(req.body.publisher.established) || 2000,
        location: req.body.publisher.location || "",
      };
      newGame["publisher"] = newPublisher;
    }
    Game.create(newGame, (err, game) =>
      helpers.getCallback(err, game, res, response, "Game added : ", 201)
    );
  } else {
    res.status(response["status"]).json(response["message"]);
  }
};

module.exports.fullUpdateOne = function (req, res) {
  const response = {
    status: 204,
    message: {},
  };
  const gameID = req.params.gameID;

  if (helpers.checkID(gameID, response)) {
    Game.findById(gameID).exec(function (err, game) {
      if (err) {
        response["status"] = 404;
        response["message"] = "Game not Found";
        console.log(response);
      } else {
        if (req.body.title) game.title = req.body.title;
        if (req.body.year) game.year = req.body.year;
        if (req.body.range) game.rage = req.body.rate;
        if (req.body.price) game.price = req.body.price;
        if (req.body.minPlayers) game.minPlayers = req.body.minPlayers;
        if (req.body.maxPlayers) game.maxPlayers = req.body.maxPlayers;
        if (req.body.minAge) game.minAge = req.body.minAge;
        if (req.body.publisher) game.publisher = req.body.publisher;
        if (req.body.designers) game.designers = req.body.designers;
        game.save((err, updatedGame) =>
          helpers.getCallback(
            err,
            updatedGame,
            res,
            response,
            "Game Updated",
            204
          )
        );
      }
    });
  }
};

module.exports.partialUpdateOne = function (req, res) {
  const response = {
    status: 204,
    message: {},
  };
  const gameID = req.params.gameID;

  if (helpers.checkID(gameID, response)) {
    Game.findById(gameID).exec(function (err, game) {
      if (err) {
        response["status"] = 404;
        response["message"] = "Game not Found";
        console.log(response);
      } else {
        game.title = req.body.title || game.title;
        game.year = req.body.year || game.year;
        game.rage = req.body.rate || game.rage;
        game.price = req.body.price || game.price;
        game.minPlayers = req.body.minPlayers || game.minPlayers;
        game.maxPlayers = req.body.maxPlayers || game.maxPlayers;
        game.minAge = req.body.minAge || game.minAge;
        game.publisher = req.body.publisher || game.publisher;
        game.designers = req.body.designers || game.designers;
        game.save((err, updatedGame) =>
          helpers.getCallback(
            err,
            updatedGame,
            res,
            response,
            "Game Updated",
            204
          )
        );
      }
    });
  }
};

module.exports.deleteOne = function (req, res) {
  const expectedStatus = 204;
  const response = { status: 200, message: {} };
  const gameID = req.params.gameID;

  if (helpers.checkID(gameID, response))
    Game.findByIdAndDelete(gameID).exec((err, games) =>
      helpers.getCallback(
        err,
        games,
        res,
        response,
        "Game deleted Successfully : ",
        expectedStatus
      )
    );
};
