const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controllers");
const courseController = require("../controllers/course.controller");
const courseDetailController = require("../controllers/courseDetail.controller");

router.route("/students/:studentId/course").get(courseController.getOne);

router
  .route("/students/:studentId/course/:courseId")
  .get(courseDetailController.getOne);

console.log("route");
router
  .route("/students")
  .get(studentController.studentGetAll)
  .post(studentController.addOne);

router.route("/students/:studentId").get(studentController.getOne);

module.exports = router;
