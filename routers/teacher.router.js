const express = require("express");
const routeTeacher = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const teacherControler = require("../controlors/teacher.controler");

routeTeacher.post("/addTeacher", jsonParser, teacherControler.addTeacher);
routeTeacher.put("/modify/:id", jsonParser, teacherControler.updateTeacher);
routeTeacher.delete("/remove/:id", jsonParser, teacherControler.removeTeacher);
routeTeacher.get("/list", jsonParser, teacherControler.listTeachers);
routeTeacher.get("/find", jsonParser, teacherControler.ExploreSearch);
module.exports = routeTeacher;