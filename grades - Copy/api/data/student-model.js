const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  score: {
    type: String,
    require: true,
  },
});

const StudentSchema = mongoose.Schema({
  student_id: {
    type: Number,
    require: true,
  },
  scores: [scoreSchema],
  class_Id: {
    type: Number,
  },
});

mongoose.model(
  process.env.STUDENT_MODEL,
  StudentSchema,
  process.env.STUDENT_COLLECTIONS
);

module.exports = {
  StudentSchema,
};
