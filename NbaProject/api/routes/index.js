const express = require("express");
const router = express.Router();
const nbaController = require("../controllers/nba.controllers");
const coachesController = require("../controllers/coaches.controller");
const coachesDetailController = require("../controllers/coachesDetail.controller");

router.route("/nba").get(nbaController.nbaGetAll).post(nbaController.addOne);

router
  .route("/nba/:nbaId")
  .get(nbaController.nbaGetOne)
  .delete(nbaController.deleteOne)
  .put(nbaController.updateOne);

router
  .route("/nba/:nbaId/coaches")
  .get(coachesController.nbagetAllCoaches)
  .post(coachesController.addOne);

router
  .route("/nba/:nbaId/coaches/:coachesId")
  .get(coachesDetailController.getOne)
  .put(coachesDetailController.updateOne)
  .delete(coachesDetailController.deleteOne);

console.log("route");

module.exports = router;
