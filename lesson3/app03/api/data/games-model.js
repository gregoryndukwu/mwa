const mongoose= require("mongoose");

const PublisherSchema = mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    country:String,
    established:Number
});

const GameSchema= mongoose.Schema({
    title: {
        type: String,
        require: true
    },   
    year:  Number,
    rate:  {
       type: Number,
       min: 1,
       max:5,
       default:1
    },
    price: Number,
    minPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayer: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    publisher: PublisherSchema,
    designers:[String]
});

mongoose.model("Game", GameSchema, "games");
