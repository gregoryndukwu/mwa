const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  salary: {
    type: Number,
  },
  description: {
    type: String,
    require: true,
  },
  experience: {
    type: Number,
    require: true,
  },
  skills: {
    type: [String],
  },
  postDate: {
    type: Date,
    require: true,
  },
});
mongoose.model("Job", JobSchema, "jobs");
