const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users.controller");

router
  .route("/users")
  .post(usersControllers.addOne)
  .get(usersControllers.getAll);

router.route("/login").post(usersControllers.login);

module.exports = router;
