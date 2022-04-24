const mongoose = require("mongoose");
require("../data/db");
const User = mongoose.model(process.env.USER_MODEL);

const addOne = function (req, res) {
  console.log("Add one user controller");
  let response = {
    status: 201,
    message: {},
  };

  if (req.body && req.body.username && req.body.password) {
    const newUser = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    };

    User.create(newUser)
      .then()
      .catch((err) => {
        response.status = process.env.INTERNAL_ERROR_CODE;
        response.message = {message:err};
        _handelError(res, response);
      });
  }
};

_handelError = function (res, error, response) {
  res.status(response.status).json(response.message);
};

module.exports = {
  addOne,
};
