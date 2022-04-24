const nbaRoutes = require("./nba");
const userRoutes = require("./users");

const express = require("express");
const router = express.Router();
router.use("", nbaRoutes);
router.use("", userRoutes);
module.exports = router;
