const mongoose = require("mongoose");
const Job = mongoose.model("Job");

module.exports.getAllJobs = function (req, res) {
  let maxcount = 5;
  let count = 0;
  let offset = 5;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }
  if (count > maxcount) {
    count = maxcount;
  }
  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "Offset and counr should be numbers" });
    return;
  }
  let search = {};

  const searchBy = req.query.title;

  if (searchBy) {
    search = {
      title: searchBy,
    };
  }
  Job.find(search)
    .skip(offset)
    .limit(count)
    .exec(function (err, jobs) {
      const response = {
        status: 200,
        message: jobs,
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else {
        response.status = 200;
        response.message = jobs;
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.addOneJob = function (req, res) {
  if (!req.body.skills) {
    req.body.skills = [];
  }
  let newJob = {
    title: req.body.title,
    salary: parseFloat(req.body.salary),
    description: req.body.description,
    experience: parseInt(req.body.experience),
    skills: req.body.skills,
    postDate: req.body.postDate,
  };

  Job.create(newJob, function (err, job) {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 200;
      response.message = job;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.getOneJOb = function (req, res) {
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    const response = {
      status: 200,
      message: res,
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = { message: "Job Id not found" };
    } else {
      response.status = 200;
      response.message = job;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.deleteOneJob = function (req, res) {
  const response = {
    status: 200,
    message: res,
  };
  const jobId = req.params.jobId;
  Job.findByIdAndRemove(jobId).exec(function (err, job) {
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = { message: "Job not found" };
    } else {
      response.status = 200;
      response.message = job;
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.updatePartialJob = function (req, res) {
  const response = {
    status: 200,
    message: res,
  };
  const jobId = req.params.jobId;
  Job.findById(jobId).exec(function (err, job) {
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!job) {
      response.status = 404;
      response.message = { message: "Job not found" };
    }
    if (job) {
      if (req.body.title) {
        job.title = req.body.title;
      }
      if (req.body.salary) {
        job.salary = parseFloat(req.body.salary);
      }
      if (req.body.description) {
        job.description = req.body.description;
      }
      if (req.body.experience) {
        job.experience = parseInt(req.body.experience);
      }
      if (req.body.skills) {
        job.skills = req.body.skills;
      }
      if (req.body.postDate) {
        job.postDate = req.body.postDate;
      }
      job.save(function (err, updatedJob) {
        if (err) {
          response.status = 500;
          response.message = err;
        } else {
          response.status = 200;
          response.message = updatedJob;
        }
        res.status(response.status).json(response.message);
      });
    }
  });
};
