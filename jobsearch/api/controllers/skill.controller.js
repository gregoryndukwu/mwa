const mongoose = require("mongoose");
require("../data/db");
const Job = mongoose.model(process.env.JOB_MODEL);

const JobGetAllSkills = function (req, res) {
  console.log("GetOne Job ");
  const jobId = req.params.jobId;
  Job.findById(jobId)
    .select("skills")
    .exec(function (err, Job) {
      if (err) {
        res.status(500).json(err);
      } else console.log("Found Skills ", Job, " for Job ", Job);
      res.status(200).json(Job);
    });
};

const addOne = (req, res) => {
  console.log("Controller to Add one Skill");
  const response = {
    status: 201,
    message: {},
  };

  let jobId;

  if (req.params && req.params.jobId) {
    jobId = req.params.jobId;
    if (!mongoose.isValidObjectId(jobId)) {
      response.status = 400;
      response.message = "This Job  ID is Invalid";
    }
  } else {
    response.status = 400;
    response.message = "Cannot find without Job  ID";
  }

  if (response.status != 201) {
    res.status(response.status).json(response.message);
  } else {
    Job.findById(jobId)
      .select("skills")
      .exec(function (err, Job) {
        console.log("Found Job ", Job);
        if (err) {
          console.log("Error finding Job ");
          response.status = 500;
          response.message = err;
          console.log(err);
        } else if (!Job) {
          console.log("Job  with given Id not found " + jobId);
          response.status = 404;
          response.message = {
            message: "Job  with  Id not found " + jobId,
          };
        }
        if (Job) {
          _addSkills(req, res, Job, response);
        } else {
          res.status(response.status).json(response.message);
        }
      });
  }
};

const _addSkills = (req, res, Job, response) => {
  console.log(req.body);
  const name = req.body.name;
  const level = req.body.level;
  console.log("The name is" + name + "level is" + level);
  if (name) {
    if (isNaN(name)) {
      Job.skills.name = name;
    } else {
      response.status = 400;
      response.message = "Name must be a string";
    }
  } else {
    response.status = 400;
    response.message = "Name must be filled";
  }

  if (level) {
    if (isNaN(level)) {
      Job.skills.level = level;
    } else {
      response.status = 400;
      response.message = "Level must be filled";
    }
  }

  let newSkills = {
    name: name,
    level: level,
  };

  if (response.status != 201) {
    res.status(response.status).json(response.message);
  } else {
    Job.skills.push(newSkills);

    Job.save(function (err, Job) {
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 201;
        response.message = Job.skills;
      }
      res.status(response.status).json(response.message);
    });
  }
};

module.exports = {
  JobGetAllSkills: JobGetAllSkills,
  addOne: addOne,
};
