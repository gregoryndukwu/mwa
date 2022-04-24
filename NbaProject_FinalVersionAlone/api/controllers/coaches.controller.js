const mongoose = require("mongoose");
require("../data/db");
const Nba = mongoose.model(process.env.NBA_MODEL);

const nbagetAllCoaches = function (req, res) {
  console.log("GetOne Coache");
  const nbaId = req.params.nbaId;
  console.log(nbaId);
  Nba.findById(nbaId)
    .select("coaches")
    .exec()
    .then(function (nba) {
      console.log("Found" + " " + nba);
      res.status(200).json(nba);
    })
    .catch(function (err) {
      console.log("Error Get all Coaches");
      res.status(500).json(err);
    });
};

const addOne = (req, res) => {
  console.log("Controller to Add one Coache Gregory");
  const response = {
    status: 201,
    message: {},
  };

  let nbaId;

  if (req.params && req.params.nbaId) {
    nbaId = req.params.nbaId;
    if (!mongoose.isValidObjectId(nbaId)) {
      response.status = 400;
      response.message = "This NBA Team ID is Invalid";
    }
  } else {
    response.status = 400;
    response.message = "Cannot find without NBA Team ID";
  }

  if (response.status != 201) {
    res.status(response.status).json(response.message);
  } else {
    Nba.findById(nbaId)
      .select("coaches")
      .exec()
      .then(function (nba) {
        if (nba) {
          _addCoache(req, res, nba, response);
        }
      })
      .catch(function (err) {
        res.status(response.status).json(response.message);
      });
  }
};

const _addCoache = (req, res, nba, response) => {
  const name = req.body.name;
  const position = req.body.position;
  console.log("The name is" + name + "position is" + position);
  if (name) {
    if (isNaN(name)) {
      nba.coaches.name = name;
    } else {
      response.status = 400;
      response.message = "Name must be a string";
    }
  } else {
    response.status = 400;
    response.message = "Name must be filled";
  }

  if (position) {
    if (isNaN(position)) {
      nba.coaches.position = position;
    } else {
      response.status = 400;
      response.message = "Position must be filled";
    }
  }

  let newCoaches = {
    name: name,
    position: position,
  };

  if (response.status != 201) {
    res.status(response.status).json(response.message);
  } else {
    nba.coaches.push(newCoaches);

    nba.save(function (err, nba) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 201;
        response.message = nba.coaches;
      }
      res.status(response.status).json(response.message);
    });
  }
};

module.exports = {
  nbagetAllCoaches: nbagetAllCoaches,
  addOne: addOne,
};
