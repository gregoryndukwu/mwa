const dbConnection = require("../data/dbconnection");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { response } = require("express");
const { deepStrictEqual } = require("assert");
const { count } = require("console");
require("../data/db");
const Game = mongoose.model("Game", process.env.GAME_MODEL);

const getAll = function (req, res) {
  console.log("Get all Games Controller");

  const response = {
    status: 200,
    message: {},
  };

  let offset = 0;
  let count = 5;
  let max = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    console.log("Offset or Count is not a number");
    response.status = 400;
    response.message = "offset and count must be digit";
  }

  if (count > max) {
    console.log("Count greater than max");
    response.status = 400;
    response.message = "Count canot be greater than " + max;
  }

  if (response.status != 200) {
    res.status(response.status).json(response.message);
  } else {
    if (req.query && req.query.lat && req.query.lng) {
      _runGeoQuery(req, res);
      return;
    }
    Game.find()
      .skip(offset)
      .limit(count)
      .exec((err, games) => _getAllGames(err, games, response, res));
  }
};
/*
_runGeoQuery = function (res, req) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const point = {
    type: "Point",
    coodinates: [lng, lat],
  };

  const query = {
      "publisher.location.coodinates":
      {
          $near:{
              $geometry: point,
              $minDistance
          }
      }
    {
  Game.find(query).skip(offset).limit(count).exec(function (err, games) {
      if (err){
          console.log("Geo error",err);

      }
  });
};
*/
const _getAllGames = (err, games, response, res) => {
  console.log("Found Games", games.length);
  res.status(response.status).json(games);
};

/*
const getAll = function (req, res) {

    console.log("teste aqui")
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }
  
    Game.find().skip(offset).limit(count).exec(function (err, game) {
        console.log("Found games", game.length);
        res.json(game);
    });
}
*/

const getOne = function (req, res) {
  console.log("Get One Game Controller");
  const response = {
    status: 200,
    message: {},
  };
  const gameId = req.params.gameId;

  if (req.params && gameId) {
    if (!mongoose.isValidObjectId(gameId)) {
      response.status = 400;
      response.message = "Invalid gameId";
    }
  } else {
    response.status = 400;
    response.message = "Canot find without gameId";
  }
  if (response.status != 200) {
    res.status(response.status).json(response.message);
  } else {
    Game.findById(gameId).exec((err, games) =>
      _findGameById(err, games, response, res)
    );
  }
};

const _findGameById = (err, games, response, res) => {
  if (err) {
    res.status(500).json({ error: err });
  } else {
    res.status(response.status).json(games);
  }
};

const addOne = function (req, res) {
  console.log("Add One Game controller");
  const response = {
    status: 200,
    message: {},
  };
  const newGame = {
    title: req.body.title,
    year: req.body.year,
    rate: req.body.rate,
    price: req.body.price,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    publisher: { name: "NoName" },
    reviews: [],
    minAge: req.body.minAge,
    designers: [req.body.designers],
  };
  Game.create(newGame, function (err, game) {
    if (err) {
      console.log("Error creating game");
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = game;
    }
    res.status(response.status).json(response.message);
  });
};

const deleteOne = function (req, res) {
  console.log("Delete One Controller");
  const gameId = req.params.gameId;
  const response = {
    status: 200,
    message: {},
  };
  if (!mongoose.isValidObjectId(gameId)) {
    console.log("Invalid Id");
    response.status = 404;
    response.message = "Invalid gameId";
    return res.status(response.status).json(response.message);
  }
  Game.findByIdAndDelete(gameId).exec(function (err, deleteGame) {
    if (err) {
      console.log("Error reading game");
      response.status = 500;
      response.message = err;
    } else if (!deleteGame) {
      console.log("Game to delete not found");
      response.status = 404;
      response.message = "Game Id Not found";
    } else {
      console.log("Found game to delete");
      response.status = 200;
      response.message = deleteGame;
    }

    return res.status(response.status).json(response.message);
  });
};

const updateOne = function (req, res) {
  console.log("Update One Game Controller");
  gamdeUpdate = function (req, res, game, response) {
    game.year = req.body.year;
    game.title = req.body.title;
    game.rate = req.body.rate;
    game.price = req.body.price;
    game.maxPlayers = req.body.maxPlayers;
    game.minPlayers = req.body.minPlayers;
    game.minAge = req.body.minAge;
    game.designers = req.body.designers;
    game.publisher.name = req.body.publisher.name;
    game.publisher.country = req.body.publisher.country;
    game.publisher.established = req.body.publisher.established;
    game.publisher.location = req.body.publisher.location;

    game.reviews = [];
    game.save(function (err, updateGame) {
      if (err) {
        response.status = 500;
        response.err = err;
      } else {
        response.status = 202;
        response.message = updateGame;
      }
      return res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, gamdeUpdate);
};

const _updateOne = function (req, res, gameUpdate) {
  const gameId = req.params.gameId;
  const response = {
    status: 200,
    message: "Register Update",
  };
  if (!mongoose.isValidObjectId(gameId)) {
    console.log("Invalid Id");
    response.status = 404;
    response.message = "Invalid gameId";
    return res.status(response.status).json(response.message);
  }
  Game.findById(gameId).exec(function (err, game) {
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("game is null");
      response.status = 404;
      response.message = { message: "Game with given Id not found" };
    }
    if (game) {
      gameUpdate(req, res, game, response);
    } else {
      return res.status(response.status).json(response.message);
    }
    console.log("The register was saved");
  });
};

const partialUpdate = function (req, res) {
  console.log("Partial Update Game Controller");
  partialGameUpdate = function (req, res, game, response) {
    game.title = req.body.title || game.title;
    game.year = req.body.year || game.year;
    game.rate = req.body.rate || game.rate;
    game.price = req.body.price || game.price;
    game.maxPlayers = req.body.maxPlayers || game.maxPlayers;
    game.minPlayers = req.body.minPlayers || game.minPlayers;
    game.minAge = req.body.minAge || game.minAge;
    game.designers = req.body.designers || game.designers;
    game.publisher.name = req.body.publisher.name || game.publisher.name;
    game.publisher.country =
      req.body.publisher.country || game.publisher.country;
    game.publisher.established =
      req.body.publisher.established || game.publisher.established;
    game.publisher.location =
      req.body.publisher.location || game.publisher.location;

    game.save(function (err, updatedGame) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = updatedGame;
      }
      return res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, partialGameUpdate);
};

/*
const getOne = function (req, res) {
    const gameId = req.params.gameId;
    console.log(gameId);
    Game.findById(gameId).exec(function (err, game) {
        res.status(200).json(game);
    });
}
*/

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
  partialUpdate,
};
