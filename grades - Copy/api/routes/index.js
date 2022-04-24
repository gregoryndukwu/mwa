const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
console.log("I am router");

router.route("/students").get(studentController.studentGetAll);

router
  .route("/student/:studentid")
  .delete(studentController.deleteOne)
  .get(studentController.studentGetOne);

module.exports = router;
