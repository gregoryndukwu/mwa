const mongoose = require("mongoose");
const getCallback = function (
  err,
  games,
  res,
  response,
  logString,
  statusCode
) {
  if (err) {
    response["status"] = 500;
    response["message"] = { message: "Couldn't read data from db : " + err };
  } else {
    if (!games) {
      response["status"] = 404;
      response["message"] = { message: "Not found" };
    } else {
      console.log(logString, games.length || games);
      response.status = statusCode;
      response.message = games;
      res.status(response.status).json(response.message);
    }
  }
  if (response["status"] != statusCode) {
    res.status(response.status).json(response.message);
  }
};

const checkID = function (inputID, response) {
  if (!mongoose.isValidObjectId(inputID)) {
    response["status"] = 404;
    response["message"] = { message: "Incorrect data format provided" };
    return false;
  }
  return true;
};

const responseSetter = function (status, message) {
  return {
    status: status,
    message: message,
  };
};

module.exports = {
  getCallback,
  checkID,
  responseSetter,
};
