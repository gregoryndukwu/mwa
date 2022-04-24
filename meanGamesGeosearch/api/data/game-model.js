require("dotenv").config();
const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: String,
  established: Number,
  location: {
    type: [Number], // longitude (E/w), lattitude (N/S)
    index: "2dphere",
  },
});

const reviewSchema = mongoose.Schema({
  title: String,
  rating: Number,
  review: String,
  postDate: Date,
});
const gameSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  rate: {
    type: Number,
    min: 1,
    max: 5,
  },
  price: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  maxPlayers: {
    type: Number,
    min: 1,
    max: 10,
  },
  minAge: Number,
  designers: [String],
  reviews: [reviewSchema],
  publisher: publisherSchema,
});

//compile model
mongoose.model(process.env.GAME_MODEL, gameSchema, process.env.GAME_MODEL);
