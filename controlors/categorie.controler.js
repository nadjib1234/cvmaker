const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

/**
 * Add a new category to the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

const addCategorie = async (req, res, next) => {
    try {
        const { title, discription, isPublished,supperCatID } = req.body.data;

        // Check if the necessary data (title) is provided
        if (!title) {
            return res.send({
                message: "Error! Title is required.",
                code: 400
            });
        }
    
        // Creating a new category record in the database
        const newCategorie = await db.categorie.create({
            title: title,
            discription: discription,
            isPublished: isPublished,
            isSubCategory:supperCatID?true:false,
            supperCatID: supperCatID
        });

        return res.send({
            message: `Category '${title}' has been added successfully.`,
            categoryId: newCategorie.ID_ROWID,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while adding the category.",
            error: error.message,
            code: 400
        });
    }
};

/**
 * Delete a category from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

const removeCategorie = async (req, res, next) => {
    try {
        const categorieId = req.params.id; // Assuming the category ID is passed as a parameter in the URL

        if (!categorieId) {
            return res.send({
                message: "Error! Category ID is required for deletion.",
                code: 400
            });
        }

        await db.categorie.destroy({
            where: { ID_ROWID: categorieId }
        });

        return res.send({
            message: "Category deleted successfully!",
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while deleting the category.",
            error: error.message,
            code: 400
        });
    }
};

const updateCategorie = async (req, res, next) => {
    try {
        const categorieId = req.params.id;  // Assuming the category ID is passed as a parameter in the URL
        const { title, discription, isPublished, isSubCategory, supperCatID } = req.body.data;

        // Check if category ID is provided
        if (!categorieId) {
            return res.send({
                message: "Error! Category ID is required for updating.",
                code: 400
            });
        }

        // Updating the category record in the database
        await db.categorie.update({
            title: title,
            discription: discription,
            isPublished: isPublished,
            isSubCategory:supperCatID?true:false,
            supperCatID: supperCatID
        }, {
            where: { ID_ROWID: categorieId }
        });

        return res.send({
            message: `Category with ID '${categorieId}' has been updated successfully.`,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while updating the category.",
            error: error.message,
            code: 400
        });
    }
};
const listCategories = async (req, res, next) => {
    try {
        const categories = await db.categorie.findAll({
            attributes: ['title', 'discription', 'isPublished', 'isSubCategory', 'supperCatID']
        });

        return res.send({
            message: "List of all categories.",
            categories: categories,
            code: 200
        });
    } catch (error) {
        return res.send({
            message: "An error occurred while fetching categories.",
            error: error.message,
            code: 400
        });
    }
};

const Fuse = require('fuse.js');

const exploreSearchCategories = async (req, res, next) => {
    try {
        const findKey = req.body.Key;
        
        if (!findKey) {
            return res.send({
                message: "Search key is missing.",
                categories: null,
                code: 200
            });
        }

        const itemsForSearching = await db.categorie.findAll({
            attributes: ['title', 'discription', 'isPublished', 'isSubCategory', 'supperCatID']
        });

        const options = {
            includeScore: true,
            keys: ['title', 'discription']
        };

        const fuse = new Fuse(itemsForSearching, options);
        const result = fuse.search(findKey);
        const filteredItems = result.map(item => item.item);
            return res.send({
                message: "Search results for categories.",
                categories: filteredItems,
                code: 200
            });
       
    } catch (error) {
        return res.send({
            message: "An error occurred during the search.",
            error: error.message,
            code: 400
        });
    }
};

// Exporting the functions so they can be used elsewhere

module.exports = {
    addCategorie,
    updateCategorie,
    removeCategorie,
    listCategories,
    exploreSearchCategories
};
