const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controllers.js");
const skillController = require("../controllers/skill.controller");

router.route("/job").get(jobController.jobGetAll).post(jobController.addOne);

router
  .route("/job/:jobId")
  .get(jobController.jobGetOne)
  .delete(jobController.deleteOne)
  .put(jobController.updateOne);

router
  .route("/job/:jobId/skills")
  .get(skillController.JobGetAllSkills)
  .post(skillController.addOne);

console.log("route");

module.exports = router;
