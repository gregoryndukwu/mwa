const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
});

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  salary: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  experience: {
    type: String,
    require: true,
  },
  skills: [skillSchema],
  postDate: {
    type: String,
    require: true,
  },
});

mongoose.model(process.env.JOB_MODEL, JobSchema, process.env.JOB_COLLECTIONS);

module.exports = {
  JobSchema,
};
