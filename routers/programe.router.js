const express = require("express");
const routeprogram = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const programControler = require("../controlors/program.controler");

routeprogram.post("/addProgram", jsonParser, programControler.addProgram);
routeprogram.get("/registrable", jsonParser, programControler.listRegistrablePrograms);
routeprogram.get("/nonskiped", jsonParser, programControler.findNonSkippedPrograms);
routeprogram.delete("/removeProgram/:id", jsonParser, programControler.removeProgram);
routeprogram.put("/updateProgram/:id", jsonParser, programControler.updateProgram);
routeprogram.get("/listProgram", jsonParser, programControler.getPrograms);
routeprogram.get("/getProgram/:id", jsonParser, programControler.getProgram);

module.exports = routeprogram;