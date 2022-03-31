const express = require("express");
const router = express.Router();

router.route("/json")
.get("/json",function(req,res){
    res.status(200).json("{'JSON DATA':TRUE");
 })

 .post(function(req,res){
    res.status(200).json("{'JSON DATA':POST");
 })

 module.exports = router;