const express = require("express");
const routeCategorie = express.Router();
var bodyParser = require("body-parser");
const categorieController = require("../controlors/categorie.controler");
var jsonParser = bodyParser.json();

// Route for adding a new category
routeCategorie.post("/addCategorie", jsonParser, categorieController.addCategorie);

// Route for updating a category
routeCategorie.put("/updateCategorie/:id", jsonParser, categorieController.updateCategorie);

// Route for deleting a category
routeCategorie.delete("/removeCategorie/:id", jsonParser, categorieController.removeCategorie);
routeCategorie.get("/listCategorie", jsonParser, categorieController.listCategories);
routeCategorie.get("/selectedListCategories", jsonParser, categorieController.selectedListCategories);
routeCategorie.get("/find", jsonParser, categorieController.exploreSearchCategories);
module.exports = routeCategorie;
