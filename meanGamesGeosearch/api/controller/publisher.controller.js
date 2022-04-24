const req = require("express/lib/request");
const mongoose = require("mongoose");
const callbackAndValidation = require("./callbacksAndValidations");
const Game = mongoose.model(process.env.GAME_MODEL);

module.exports.getOne = function (req, res) {
  const gameID = req.params.gameID;
  const response = { status: 400, message: {} };
  if (callbackAndValidation.checkID(gameID, response)) {
    Game.findById(gameID)
      .select("publisher")
      .exec((err, game) => getOnePublisherCallback(err, game, res, response));
  }
};

module.exports.addOne = function (req, res) {
  const gameID = req.params.gameID;
  const response = { status: 400, message: {} };
  if (callbackAndValidation.checkID(gameID, response)) {
    Game.findById(gameID)
      .select("publisher")
      .exec((err, game) =>
        addOnePublisherCallback(err, game, res, req, response)
      );
  }
};

module.exports.fullUpdateOne = function (req, res) {
  const gameID = req.params.gameID;
  const response = { status: 400, message: {} };
  if (callbackAndValidation.checkID(gameID, response)) {
    Game.findById(gameID)
      .select("publisher")
      .exec((err, game) =>
        addOnePublisherCallback(err, game, res, req, response)
      );
  }
};

module.exports.partialUpdateOne = function (req, res) {
  const gameID = req.params.gameID;
  const response = { status: 400, message: {} };
  if (callbackAndValidation.checkID(gameID, response)) {
    Game.findById(gameID)
      .select("publisher")
      .exec((err, game) =>
        partialUpdatePublisherCallback(err, game, res, req, response)
      );
  }
};

module.exports.deleteOne = function (req, res) {
  const gameID = req.params.gameID;
  const response = { status: 400, message: {} };
  if (callbackAndValidation.checkID(gameID, response)) {
    Game.findById(gameID)
      .select("publisher")
      .exec((err, game) => deleteOneCallback(err, game, res, response));
  }
};

const deleteOneCallback = function (err, game, res, response) {
  if (err) {
    callbackAndValidation.responseSetter(404, "Game not found");
  }
  const publisher = { name: "No name" };
  game.publisher = publisher;
  game.save((err, publisher) =>
    callbackAndValidation.getCallback(
      err,
      publisher,
      res,
      response,
      "publisher Deleted",
      204
    )
  );
};

const addOnePublisherCallback = function (err, game, res, req, response) {
  let newPublisher;
  if (err) {
    response["status"] = 404;
    response["message"] = "game is absent";
  }
  if (!req.body || !req.body.name) {
    response["status"] = 400;
    response["message"] = "not all required fields provided";
  }
  if (req.body && req.body.name) {
    newPublisher = { name: req.body.name };
    if (req.body.country) newPublisher["country"] = req.body.country;
    if (req.body.established)
      newPublisher["established"] = req.body.established;

    game.publisher = newPublisher;
    game.save((err, updatedGame) =>
      callbackAndValidation.getCallback(
        err,
        updatedGame,
        res,
        response,
        "Publisher Added ",
        201
      )
    );
  }
};

const partialUpdatePublisherCallback = function (
  err,
  game,
  res,
  req,
  response
) {
  let newPublisher = game.publisher;
  if (err) {
    response["status"] = 404;
    response["message"] = "game is absent";
  }
  if (!req.body) {
    response["status"] = 400;
    response["message"] = "not all required fields provided";
  }
  if (req.body) {
    newPublisher.name = req.body.name || newPublisher.name;
    newPublisher.country = req.body.country || newPublisher.country;
    newPublisher.established = req.body.established || newPublisher.established;
    newPublisher.location = req.body.location || newPublisher.location;

    game.save((err, newPublisher) =>
      callbackAndValidation.getCallback(
        err,
        newPublisher,
        res,
        response,
        "Publisher Added ",
        204
      )
    );
  }
};

const getOnePublisherCallback = function (err, game, res, response) {
  const publisher = game.publisher;
  callbackAndValidation.getCallback(
    err,
    publisher,
    res,
    response,
    "Publisher Found ",
    200
  );
};
