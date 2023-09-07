const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

// Function to add a new class to the database
async function addClass(data) {
    const { className, capacité } = data;

    // Check if the necessary data is provided
    if (!className || !capacité) {
        return {
            message: "Error! There is missing data",
            code: 400
        };
    }

    // Creating a new class record in the database
    const newClass = await db.classe.create({
        className: className,
        capacité: capacité
    });

    // Return the ID of the newly created class for potential further use
    return newClass.ID_ROWID;
}

// Function to update a class in the database
async function updateClass(classId, data) {
    const { className, capacité } = data;

    if (!classId) {
        return {
            message: "Error! Class ID is required for updating.",
            code: 400
        };
    }

    await db.classe.update({
        className: className,
        capacité: capacité
    }, {
        where: { ID_ROWID: classId }
    });

    return {
        message: "Class updated successfully!",
        code: 200
    };
}

// Function to delete a class from the database
async function deleteClass(classId) {
    if (!classId) {
        return {
            message: "Error! Class ID is required for deletion.",
            code: 400
        };
    }

    await db.classe.destroy({
        where: { ID_ROWID: classId }
    });

    return {
        message: "Class deleted successfully!",
        code: 200
    };
}

module.exports = {
    addClass,
    updateClass,
    deleteClass
};
