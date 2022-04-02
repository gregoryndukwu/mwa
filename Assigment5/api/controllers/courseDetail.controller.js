const mongoose = require("mongoose");
require("../data/db");
const Student = mongoose.model("Students",process.env.GAME_MODEL)

const getOne = function (req, res) {
    console.log("GetOne Course Detail");
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
  
    Student.findById(studentId).select("course").exec(function (err, students) {
        console.log("Found Courses ", students, " for Students ", students);
        res.status(200).json(students);
    });
}
module.exports = {
    getOne: getOne
}