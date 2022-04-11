const mongoose= require("mongoose");


const gameSchema= mongoose.Schema({
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
    designers:[String]
});

mongoose.model("Game", gameSchema, process.env.GAME_MODEL);
