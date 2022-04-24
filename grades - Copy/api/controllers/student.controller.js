const mongoose = require("mongoose");
require("../data/db");
const Student = mongoose.model(process.env.STUDENT_MODEL);

const studentGetAll = function (req, res) {
  console.log("controller");
  let offset = 0;
  let count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "Offset and count must be numbers" });
    return;
  }
  console.log(Student);
  // Student.find()
  //   .skip(offset)
  //   .limit(count)
  //   .exec(function (err, student) {
  //     if (err) {
  //       console.log("Error find students grades");
  //       res.status(500).json(err);
  //     } else {
  //       console.log("Found Students grades", student.length);
  //       res.json(student);
  //     }
  //   });
  Student.find()
    .skip(offset)
    .limit(count)
    .exec()
    .then(function (student) {
      console.log("Found Students grades", student.length);
      res.json(student);
    })
    .catch(function (err) {
      console.log("Error find students grades");
      res.status(500).json(err);
    });
};

const deleteOne = function (req, res) {
  console.log("Delete");
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId).exec(function (err, deleteStudent) {
    const response = { status: 204, message: deleteStudent };
    if (err) {
      console.log("Error findins Student");
      response.status = 500;
      response.message = err;
    } else if (!deleteStudent) {
      console.log("Student Id not found");
      response.status = 404;
      response.message = "Student Id not found";
    }
    console.log("Student Deleted");
    res.status(200).json("Delete Successuf");
  });

  // Student.findByIdAndDelete(studentId)
  //   .exec.then(function () {
  //     console.log("Student Deleted");
  //     res.status(200).json("Delete Successuf");
  //   })
  //   .catch(function (err) {
  //     console.log("Error findins Student");
  //     response.status = 500;
  //     response.message = err;
  //   });
};

const studentGetOne = function (req, res) {
  const studentId = req.params.studentId;
  console.log(studentId);
  Student.findById(studentId).exec(function (err, student) {
    res.status(200).json(student);
  });
};

module.exports = {
  studentGetAll,
  deleteOne,
  studentGetOne,
};
