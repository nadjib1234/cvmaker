const express = require("express");
const routeclass = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const classControler = require("../controlors/class.controler");

routeclass.get("/listSalles", jsonParser, classControler.allClasses);
routeclass.post("/addSalle", jsonParser, classControler.addClass);
routeclass.delete("/removeSalle/:id", jsonParser, classControler.deleteClass);
routeclass.put("/updateSalle/:id", jsonParser, classControler.updateClass);

module.exports = routeclass;