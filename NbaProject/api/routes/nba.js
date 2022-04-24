const express = require("express");
const router = express.Router();
const nbaController = require("../controllers/nba.controllers");
const coachesController = require("../controllers/coaches.controller");
const coachesDetailController = require("../controllers/coachesDetail.controller");

router
  .route("/nba")
  .get(nbaController.nbaGetAll) //With promise
  .post(nbaController.addOne); // with promise

router
  .route("/nba/:nbaId")
  .get(nbaController.nbaGetOne) //With promise
  .delete(nbaController.deleteOne) //With promise
  .put(nbaController.updateOne);

router
  .route("/nba/:nbaId/coaches")
  .get(coachesController.nbagetAllCoaches) ////With promise
  .post(coachesController.addOne); ////With promise

router
  .route("/nba/:nbaId/coaches/:coachesId")
  .get(coachesDetailController.getOne) ////With promise
  .put(coachesDetailController.updateOne)
  .delete(coachesDetailController.deleteOne);

console.log("route");

module.exports = router;
