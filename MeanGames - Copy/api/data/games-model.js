const mongoose= require("mongoose");


const reviewSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        "default": Date.Now
    }
});


const PublisherSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    country : String,
    established : Number
})

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
    publisher : PublisherSchema,
    reviews:[reviewSchema],
    designers:[String]
});

mongoose.model("Game", gameSchema, process.env.GAME_MODEL);
