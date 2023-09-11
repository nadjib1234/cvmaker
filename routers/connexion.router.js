const express = require("express");
const connexionRouter = express.Router();
var bodyParser = require("body-parser");
const { response } = require("express");
var jsonParser = bodyParser.json();
const connexionControler = require("../controlors/connexion.controler");

connexionRouter.post("/userLogIn", jsonParser, connexionControler.login);


module.exports = connexionRouter;