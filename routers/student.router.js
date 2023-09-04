const express = require("express");
const routeStudent = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const studentControler = require("../controllers/student");

routeStudent.post("/addStudent", jsonParser, studentControler.addStudent);
module.exports = routeStudent;