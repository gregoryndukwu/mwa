const { response } = require("express");
const mongoose = require("mongoose");
require("../data/db");

const Job = mongoose.model(process.env.JOB_MODEL);

const jobGetAll = function (req, res) {
  let offset = 0;
  let count = 0;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }
  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "Offset and Count shoul be numbers" });
    return;
  }
  console.log(Job);
  Job.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, job) {
      if (err) {
        console.log("error find Jobs");
        res.status(500).json(err);
      } else {
        console.log("Found Job", job.length);
        res.json(job);
      }
    });
};

const jobGetOne = function (req, res) {
  const jobId = req.params.jobId;
  console.log(jobId);
  Job.findById(jobId).exec(function (err, job) {
    res.status(200).json(job);
  });
};

const addOne = function (req, res) {
  console.log("Job AddOne request");
  const newJob = {
    title: req.body.title,
    salary: req.body.salary,
    location: req.body.location,
    description: req.body.description,
    experience: req.body.experience,
    postDate: req.body.postDate,
    skills: req.body.skills,
  };
  Job.create(newJob, function (err, job) {
    const response = { status: 201, message: job };
    if (err) {
      console.log("Error creating Job");
      response.status = 500;
      response.message = err;
      console.log(err);
    }
    res.status(response.status).json(response.message);
  });
};

const deleteOne = function (req, res) {
  console.log("Deletendo");
  console.log("Delete");
  const jobId = req.params.jobId;
  Job.findByIdAndDelete(jobId).exec(function (err, deletedJob) {
    const response = { status: 204, message: deletedJob };
    if (err) {
      console.log("Error finding Job");
      response.status = 500;
      response.message = err;
    } else if (!deletedJob) {
      console.log("Job Id not found");
      response.status = 404;
      response.message = "jOB id NOT FOUND";
    }
    console.log("The Job was deleted");
    res.status(200).json("Delete success");
  });
};

const updateOne = function (req, res) {
  const response = {
    status: 201,
    message: {},
  };

  let updateJob = {};
  if (req.params && req.params.jobId) {
    jobId = req.params.jobId;
    if (!mongoose.isValidObjectId(jobId)) {
      response.status = 400;
      response.message = "NBA Job Id Invalid";
    }
  } else {
    response.status = 400;
    response.message = "Impossible update";
  }
  if (req.body && req.body.title) {
    updateJob.title = req.body.title;
  }
  if (Object.keys(updateJob) === 0) {
    console.log("The skills needs to be fieels");
    response.status = 400;
    response.message = "The skills can not be empty";
  }
  if (response.status != 201) {
    res.status(response.status).json(response.message);
  } else {
    Job.findByIdAndUpdate(jobId, updateJob, (err, newJob) =>
      _updateOne(err, newJob, response, res)
    );
  }
};

const _updateOne = (err, updateJob, response, res) => {
  if (err) {
    console.log("We found error Updateing");
    res.status(500).json(err);
  } else {
    res.status(response.status).json(updateJob);
  }
};

module.exports = {
  jobGetAll,
  jobGetOne,
  addOne,
  deleteOne,
  updateOne,
};
