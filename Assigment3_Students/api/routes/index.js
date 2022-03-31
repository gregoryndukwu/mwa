const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controllers");

router.route("/students")
   .get(studentController.studentGetAll);


router.route("/students/:studentId")
   .get(studentController.getOne);

module.exports = router;

