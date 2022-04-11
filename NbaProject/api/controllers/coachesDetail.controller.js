
const mongoose = require("mongoose");
require("../data/db");
const Nba = mongoose.model(process.env.NBA_MODEL)

const getOne = function (req, res) {
    console.log("GetOne Coache Detail");
    const nbaId = req.params.nbaId;
    const coachesId = req.params.coachesId;
  
    Nba.findById(nbaId).select("coaches").exec(function (err, nba) {
        console.log("Found Coaches ", nba, " for Nba Teams ", nba);
        res.status(200).json(nba.coaches.id(coachesId));
    });
}

const updateOne = (req, res) => {
    const nbaId = req.params.nbaId;
    const coachesId = req.params.coachesId;
   const response = {
    status: 200,
    message: {}
};

    if (response.status != 200) {
        res.status(response.status).json(response.message);
    } else {
        Nba.findById(nbaId).exec((err, nba) => _updateCoaches(err, req, nba, res));
    }

};

const _updateCoaches = (err, req, nba, res) => {
    if (err) {
        res.status(500).json(err);
    } else {
        let coaches = nba.coaches.id(req.params.coachesId);
        if (coaches) {
            coaches.name = req.body.name;
            coaches.position = req.body.position;
            nba.save((err) => {
                if (err) res.status(500).json(err);
                res.status(201).json(nba);
            });
        }
    }
};

const deleteOne = (req, res) => {
    const nbaId = req.params.nbaId;
    const coa = req.params.coachesId;
    const response = {
        status: 200,
        message: {}
    };
    if (response.status != 200) {
        res.status(response.status).json(response.message);
    } else {
        Nba.findById(nbaId).exec((err, nba) => _deleteCoaches(err, nba, req, res, coa));
    }
};

const _deleteCoaches = (err, nba, req, res, coa) => {
    if (err) {
        res.status(500).json(err);
    } else {
        let coaches = nba.coaches.id(req.params.coachesId);
        console.log(coaches)
        if (coaches) {
         
            coaches.remove();
            nba.save(function (err, resp) {
                if (err) res.status(500).json(err);
                else res.status(202).json(nba);
            });
        } else {
            res.status(404).json("Coache with given id: " + coaches + "not found");
        }
    }

};


module.exports = {
    getOne: getOne,
    updateOne: updateOne,
    deleteOne:deleteOne
}
