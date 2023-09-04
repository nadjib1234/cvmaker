const express = require("express");
const routeWorker = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
// const workerControler = require("../controllers/webControlers/workerControlers");


// routeWorker.post("/addWorker", jsonParser, workerControler.addWorker);
// routeWorker.post("/removeWorker", jsonParser, workerControler.removeWorker);
// module.exports = routeWorker;