const mongoose = require("mongoose");

const coachesSchema = mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    position:{
        type:String,
        require: true
    }
})

const NbaSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    Championships:{
        type: Number,
        require: true,
    },
    coaches:[coachesSchema]
      
});

mongoose.model("nba",NbaSchema,"nba")
module.exports ={
    NbaSchema
}