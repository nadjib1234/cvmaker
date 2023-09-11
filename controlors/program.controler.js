const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

// Function to add a new program to the database
const addProgram = async (req, res, next) => {
    try {
        // Extract the data sent by the user request
        const { title, discription ,categID} = req.body.data;

        // Check if the title is provided
        if (!title) {
            return res.send({
                message: "Error! There is missing data (title and is required).",
                code: 400
            });
        }

        // Create a new program record in the database
        const program = await db.program.create({
            title: title,
            discription: discription,
            categID:categID
        });

        // Return a success message along with the ID of the newly created program
        return res.send({
            message: `Program '${title}' has been added successfully.`,
            programId: program.ID_ROWID,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while adding the program.",
            error: error.message,
            code: 400
        });
    }
};

const updateProgram = async (req, res, next) => {
    try {
        // Extract the data sent by the user request
        const programId = req.params.id;
        const { title, discription ,categID} = req.body.data;

        // Check if the necessary data is provided
        if (!title && !discription && !categID) {
            return res.send({
                message: "Error! Provide a title or description or categorieID to update.",
                code: 400
            });
        }

        // Update the program record in the database
        await db.program.update({
            title: title,
            discription: discription,
            categID:categID
        }, {
            where: { ID_ROWID: programId }
        });

        return res.send({
            message: `Program with ID: ${programId} has been updated successfully.`,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while updating the program.",
            error: error.message,
            code: 400
        });
    }
};


const removeProgram = async (req, res, next) => {
    try {
        const programId = req.params.id;

        // Delete the program record from the database
        await db.program.destroy({
            where: { ID_ROWID: programId }
        })
        return res.send({
            message: `Program with ID: ${programId} has been removed successfully.`,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while removing the program.",
            error: error.message,
            code: 400
        });
    }
};

module.exports = {
    addProgram,
    updateProgram,
    removeProgram
};
