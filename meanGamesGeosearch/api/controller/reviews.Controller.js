const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

module.exports.getAll = function (req, res) {
  console.log("GET Review controller");
  const gameID = req.params.gameID;
  Game.findById(gameID)
    .select("reviews")
    .exec(function (err, reviews) {
      console.log("Found reviews ", reviews, "for Game", reviews);
      res.status(200).json(reviews);
    });
};

module.exports.getOne = function (req, res) {
  console.log("GET Review controller");
  const gameID = req.params.gameID;
  const reviewID = parseInt(req.params.reviewID);

  Game.findById(gameID).exec(function (err, games) {
    if (games.reviews != null && reviewID >= games.reviews.length) {
      res.json({ message: "review id is out of range" });
      return;
    }
    console.log(
      "Found reviews ",
      games.reviews,
      "for Game",
      games.reviews[reviewID]
    );
    res.status(200).json(games.reviews[reviewID]);
  });
};
