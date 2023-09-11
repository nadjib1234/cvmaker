const express = require("express");
const routeStudentGroup = express.Router();
const bodyParser = require("body-parser");
const studentGroupController = require("../controlors/studentgroupe.controlor");
const jsonParser = bodyParser.json();

// Route for adding a student to a group
routeStudentGroup.post("/add", jsonParser, studentGroupController.addStudentGroup);

// Route for removing a student from a group. Assuming you're sending both StudentID and GroupeID as URL parameters.
routeStudentGroup.delete("/remove/:id", jsonParser, studentGroupController.removeStudentGroup);

module.exports = routeStudentGroup;

