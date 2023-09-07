const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

// Function to add a new program to the database
async function addProgram(data) {
    const { title, discription } = data;

    // Checking if the title is provided
    if (!title) {
        return {
            message: "Error! There is missing data",
            code: 400
        };
    }

    // Creating a new program record in the database
    const program = await db.program.create({
        title: title,
        discription: discription,
    });

    // Returning the ID of the newly created program
    return program.ID_ROWID;
}
/*
// Function to update an existing program in the database
async function updateProgram(data, programId) {
    // Updating the program record where the ID matches the provided programId
    const updateStatus = await db.program.update(data, {
        where: {
            ID_ROWID: programId
        }
    });

    // If no rows are updated, it returns an array with the first element being 0
    if (updateStatus[0] === 0) {
        return {
            message: "Program not found or no update made",
            code: 404
        };
    }

    return {
        message: "Program updated successfully",
        code: 200
    };
}

// Function to remove an existing program from the database
async function removeProgram(programId) {
    // Deleting the program record where the ID matches the provided programId
    const numberOfRowsDeleted = await db.program.destroy({
        where: {
            ID_ROWID: programId
        }
    });

    // If no rows are deleted, it indicates the program was not found
    if (numberOfRowsDeleted === 0) {
        return {
            message: "Program not found",
            code: 404
        };
    }

    return {
        message: "Program removed successfully",
        code: 200
    };
}

module.exports = {
    addProgram,
    updateProgram,
    removeProgram
};
*/