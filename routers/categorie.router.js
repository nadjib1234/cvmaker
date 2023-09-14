const express = require("express");
const routeCategorie = express.Router();
var bodyParser = require("body-parser");
const categorieController = require("../controlors/categorie.controler");
var jsonParser = bodyParser.json();

// Route for adding a new category
routeCategorie.post("/add", jsonParser, categorieController.addCategorie);

// Route for updating a category
routeCategorie.put("/update/:id", jsonParser, categorieController.updateCategorie);

// Route for deleting a category
routeCategorie.delete("/remove/:id", jsonParser, categorieController.removeCategorie);
routeCategorie.get("/list", jsonParser, categorieController.listCategories);
routeCategorie.get("/find",jsonParser,categorieController.exploreSearchCategories);
module.exports = routeCategorie;
