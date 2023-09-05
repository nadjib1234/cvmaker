const express = require("express");
const routeTeacher = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const teacherControler = require("../controlors/teacher.controler");

routeTeacher.post("/addTeacher", jsonParser, teacherControler.addTeacher);
module.exports = routeTeacher;