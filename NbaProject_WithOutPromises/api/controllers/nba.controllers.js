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
    .exec(function (err, nba) {
      if (err) {
        console.log("Error Find Teams");
        res.status(500).json(err);
      } else {
        console.log("Found NBA Teams", nba.length);
        res.json(nba);
      }
    });
};

const nbaGetOne = function (req, res) {
  const nbaId = req.params.nbaId;
  console.log(nbaId);
  Nba.findById(nbaId).exec(function (err, nba) {
    res.status(200).json(nba);
  });
};

const addOne = function (req, res) {
  console.log("Nba Team AddOne request");
  const newTeam = {
    name: req.body.name,
    Championships: req.body.Championships,
    coaches: req.body.coaches,
  };

  Nba.create(newTeam, function (err, team) {
    const response = { status: 201, message: team };
    if (err) {
      console.log("Error creating NBA Team");
      response.status = 500;
      response.message = err;
      console.log(err);
    }
    res.status(response.status).json(response.message);
  });
};
const deleteOne = function (req, res) {
  console.log("Delete");
  const nbaId = req.params.nbaId;
  Nba.findByIdAndDelete(nbaId).exec(function (err, deletedTeam) {
    const response = { status: 204, message: deletedTeam };
    if (err) {
      console.log("Error finding Team");
      response.status = 500;
      response.message = err;
    } else if (!deletedTeam) {
      console.log("Team id not found");
      response.status = 404;
      response.message = "Nba Team ID not found";
    }
    console.log("The NBA Team Was Deleted");
    res.status(200).json("Delete successuf");
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
