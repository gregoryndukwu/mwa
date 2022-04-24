const { response } = require("express");
const mongoose = require("mongoose");
require("../data/db");
const Nba = mongoose.model(process.env.NBA_MODEL);

const nbaGetAll = function (req, res) {
  let offset = 0;
  let count = 0;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "Offset and Count shoud be numbers" });
    return;
  }

  console.log(Nba);
  Nba.find()
    .skip(offset)
    .limit(count)
    .exec()
    .then(function (nba) {
      console.log("Found NBA Teams", nba.length);
      res.json(nba);
    })
    .catch(function (err) {
      console.log("Error find nba teams");
      res.status(500).json(err);
    });
};

const nbaGetOne = function (req, res) {
  const nbaId = req.params.nbaId;
  console.log(nbaId);
  Nba.findById(nbaId)
    .exec()
    .then(function (nba) {
      console.log("Found one Team", nba._id);
      res.status(200).json(nba);
    })
    .catch(function (err) {
      console.log("Error find one Team");
      res.status(500).json(err);
    });
};

const addOne = function (req, res) {
  console.log("Nba Team AddOne request");
  const newTeam = {
    name: req.body.name,
    Championships: req.body.Championships,
    coaches: req.body.coaches,
  };
  Nba.create(newTeam)
    .then(function (team) {
      console.log("Create one Team", team._id);
      res.status(201).json(team);
    })
    .catch(function (err) {
      console.log("Error Creating a team");
      res.status(500).json(err);
    });
};

const deleteOne = function (req, res) {
  console.log("Delete");
  const nbaId = req.params.nbaId;
  Nba.findByIdAndDelete(nbaId)
    .exec()
    .then(function (deleteTeam) {
      console.log("The NBA Team Was Deleted" + " " + deleteTeam._id);
      res.status(200).json("Delete successuf");
    })
    .catch(function (err) {
      console.log("Error delete a team");
      res.status(500).json(err);
    });
};

const updateOne = function (req, res) {
  console.log("Update Nba Teams");
  const response = {
    status: 201,
    message: {},
  };

  let updateNbaTeam = {};
  if (req.params && req.params.nbaId) {
    nbaId = req.params.nbaId;
    console.log(nbaId);
    if (!mongoose.isValidObjectId(nbaId)) {
      response.status = 400;
      response.message = "NBA Team ID Invalid";
    }
  } else {
    response.status = 400;
    response.message = "Impossible Update without NBA Team ID";
  }
  if (req.body && req.body.name) {
    updateNbaTeam.name = req.body.name;
  }
  if (req.body && req.body.Championships) {
    updateNbaTeam.Championships = parseInt(req.body.Championships, 10);
    if (isNaN(updateNbaTeam.Championships)) {
      console.log("Championships cannot be a String");
      response.status = 400;
      response.message = "Championships must be a Number and not a Text";
    }
  }
  if (Object.keys(updateNbaTeam) === 0) {
    console.log("The Coaches needs to be filled");
    response.status = 400;
    response.message = "The coaches must be filled";
  }
  if (response.status != 201) {
    res.status(response.status).json(response.message);
  } else {
    Nba.findByIdAndUpdate(nbaId, updateNbaTeam, (err, newTeam) =>
      _updateOne(err, newTeam, response, res)
    );
  }
};

const _updateOne = (err, updateNbaTeam, response, res) => {
  if (err) {
    console.log("We found error Updateing NBA Team");
    res.status(500).json(err);
  } else {
    res.status(response.status).json(updateNbaTeam);
  }
};

module.exports = {
  nbaGetOne,
  nbaGetAll,
  addOne,
  deleteOne,
  updateOne,
};
