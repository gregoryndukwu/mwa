const express = require("express");
const router = express.Router();
const Jobcontroller = require("../controllers/job-controller");

router
  .route("/jobs")
  .get(Jobcontroller.getAllJobs)
  .post(Jobcontroller.addOneJob);

router
  .route("/jobs/:jobId")
  .get(Jobcontroller.getOneJOb)
  .put(Jobcontroller.updatePartialJob)
  .delete(Jobcontroller.deleteOneJob);

module.exports = router;
