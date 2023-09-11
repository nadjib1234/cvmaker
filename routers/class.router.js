const express = require("express");
const routeclass = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const classControler = require("../controlors/class.controler");

routeclass.post("/add", jsonParser,classControler.addClass);
routeclass.delete("/remove/:id", jsonParser, classControler.deleteClass);
routeclass.put("/update/:id",jsonParser,classControler.updateClass);

module.exports = routeclass;