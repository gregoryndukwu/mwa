const mongoose = require("mongoose");
require("../data/db");
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addOne = function (req, res) {
  console.log("Add one user controller");
  const response = {
    status: 201,
    message: {},
  };
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);
  if (req.body && req.body.username && req.body.password) {
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), (err, salt) =>
      CheckForErrorCreateHashThenCreateUser(err, salt, response, req, res)
    );
  } else {
    response.status = process.env.USER_ERROR_MISSING_PARAMS;
    response.message = process.env.INCORRECT_ADD_USER_PARAMETERS;
    _sendResponse(res, response);
  }
};

CheckForErrorCreateHashThenCreateUser = function (
  err,
  salt,
  response,
  req,
  res
) {
  if (err) {
    response.status = process.env.INTERNAL_ERROR_CODE;
    response.message = err;
    _sendResponse(res, response);
  } else {
    bcrypt.hash(req.body.password, salt, (err, passwordHash) =>
      CheckForErrorAndCreateUser(err, passwordHash, response, req, res)
    );
  }
};

CheckForErrorAndCreateUser = function (err, passwordHash, response, req, res) {
  if (err) {
    response.status = process.env.INTERNAL_ERROR_CODE;
    response.message = err;
    _sendResponse(res, response);
  } else {
    const newUser = {
      name: req.body.name,
      username: req.body.username,
      password: passwordHash,
    };
    User.create(newUser)
      .then((createdUser) => _onSuccessfulUserCreation(createdUser, response))
      .catch((err) => _handelError(err, response))
      .finally(() => _sendResponse(res, response));
  }
};

_sendResponse = function (res, response) {
  res.status(response.status).json(response.message);
};

_onSuccessfulUserCreation = function (message, response) {
  response.status = process.env.USER_CREATED_STATUS_CODE;
  response.message = message;
};

_handelError = function (err, response) {
  response.status = process.env.INTERNAL_ERROR_CODE;
  response.message = { message: err };
};

const getAll = (req, res) => {
  const response = {
    status: process.env.READ_STATUS_CODE,
    message: "",
  };

  let offset = parseInt(0, 10);
  let count = parseInt(5, 10);
  let max = parseInt(10, 10);

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  // if (isNaN(offset) || isNaN(count)) {
  //   console.log("Offset or Count is not a number");
  //   response.status = process.env.HTTP_BAD_REQUEST_STATUS_CODE;
  //   response.message = "offset and count must be digit";
  // }

  // if (count > max) {
  //   console.log("Count greater than max");
  //   response.status = process.env.HTTP_BAD_REQUEST_STATUS_CODE;
  //   response.message = "Count cannot be greater than " + max;
  // }

  if (response.status != READ_STATUS_CODE) {
    res
      .status(response.status)
      .json({ status: "failed", msg: response.message });
  } else {
    User.find()
      .skip(offset)
      .limit(count)
      .then((users) => _returnFoundUsers(users, response))
      .catch((err) => _handelError(err, response))
      .finally(() => _sendResponse(res, response));
  }
};

const _returnFoundUsers = (foundUsers, response) => {
  response.status = process.env.READ_STATUS_CODE;
  response.message = foundUsers;
};

const login = (req, res) => {
  console.log("I am login");
  const response = {
    status: process.env.READ_STATUS_CODE,
    message: "",
  };

  if (req.params && req.body && req.body.username && req.body.password) {
    User.findOne({ username: req.body.username })
      .then((user) => _findUser(user, req, response, res))
      // .then((response)=>response)
      .catch((err) => _errorHandler(err, response));
    // .finally((res, response)=>_sendResponse(res, response));
  } else {
    response.status = process.env.ERROR_CODE;
    response.message = "You must provide username and password";
    res.status(response.status).json(response.message);
  }
};

const _findUser = (user, req, response, res) => {
  if (user) {
    console.log(user);
    bcrypt
      .compare(req.body.password, user.password)
      .then((match) => _comparePassword(match, user, response))
      .catch((err) => _errorHandler(err, response))
      .finally(() => _sendResponse(res, response));
  } else {
    response.status = process.env.HTTP_NOT_FOUND_STATUS_CODE;
    response.message = "Invalid email";
    res.status(response.status).json(response.message);
  }
};

const _comparePassword = (match, user, response) => {
  if (match) {
    const token = generateAccessToken(user.name);
    response.message = { success: true, token: token };
    console.log(response);
  } else {
    response.status = process.env.ERROR_CODE;
    response.message = { success: false };
  }
};

function generateAccessToken(username) {
  return jwt.sign({ name: username }, process.env.MY_TOKEN, {
    expiresIn: "5600s",
  });
}

module.exports = {
  addOne,
  getAll,
  login,
};
