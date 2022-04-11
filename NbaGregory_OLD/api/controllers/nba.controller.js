const mongoose = require("mongoose");
require("../data/db");
const Nba = mongoose.model(process.env.NBA_MODEL)


const nbaGetAll = function (req,res){
    let offset = 0;
    let count = 5;

    if (req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count){
        offset = parseInt(req.query.count, 10);
    }

    //res.json({message:"test"});

     Nba.find().skip(offset).limit(count).exec(function (err, nbaTeams){
             console.log("Found NBA Teams", nbaTeams.length)
            res.json(nbaTeams);
     })
    
}

const nbaGetOne = function (req, res){
    const nbaId = req.params.nbaId;
    console.log("The Id of the nba team is  " + nbaId);
    Nba.findById(nbaId).exec(function(err, nbaTeams){
        res.status(200).json(nbaTeams)
    })
}
/*
const nbaAddOne = (req, res => {
    const db = mongoose.connect();
    const nbaCollection = db.collection
}) */




module.exports = {
    nbaGetAll,
    nbaGetOne
}
