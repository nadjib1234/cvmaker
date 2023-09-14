const express = require("express");
const schoolRouter = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const schoolControler = require("../controlors/school.controler");

schoolRouter.post("/updateGeneralData", jsonParser, schoolControler.updateGeneralSchoolData);
schoolRouter.get("/getGeneralData", jsonParser, schoolControler.getGeneralSchoolData);


module.exports = schoolRouter;