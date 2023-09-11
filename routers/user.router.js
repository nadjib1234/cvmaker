const express = require("express");
const userRouter = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const userControler = require("../controlors/user.controller");

userRouter.post("/addWorker", jsonParser, userControler.addUser);


module.exports = userRouter;