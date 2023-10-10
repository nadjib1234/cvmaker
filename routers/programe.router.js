const express = require("express");
const routeprogram = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const programControler = require("../controlors/program.controler");

routeprogram.post("/addProgram", jsonParser,programControler.addProgram);
routeprogram.get("/registrable",jsonParser,programControler.listRegistrablePrograms);
routeprogram.get("/nonskiped",jsonParser,programControler.findNonSkippedPrograms);
routeprogram.delete("/remove/:id", jsonParser, programControler.removeProgram);
routeprogram.put("/update/:id",jsonParser,programControler.updateProgram);

module.exports = routeprogram;