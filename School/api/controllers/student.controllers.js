const StudentData = require("../data/school.json");
const mongoose = require("mongoose");
require("../data/db")
const Student = mongoose.model("Students", process.env.SCHOOL_MODEL)

const studentGetAll = function (req, res) {
    console.log("here")
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }
  
    Student.find().skip(offset).limit(count).exec(function (err, students) {
        console.log("Found Students", students.length);
        res.json(students);
    });
}

const getOne = function (req, res) {
    const studentId = req.params.studentId;
    console.log(studentId);
    Student.findById(studentId).exec(function (err, students) {
        res.status(200).json(students);
    });
}

module.exports = {
    getOne,
    studentGetAll
}
    


