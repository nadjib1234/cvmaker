const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

// Function to add a new program to the database
const addProgram = async (req, res, next) => {
    try {
        // Extract the data sent by the user request
        const { title, discription, categID, type, isSkip } = req.body.dataProgram;
        console.log(req.body);
        // Check if the title is provided
        if (!title || !type) {
            return res.send({
                message: "Error! There is missing data.",
                code: 400
            });
        }

        // Create a new program record in the database
        const program = await db.program.create({
            title: title,
            discription: discription,
            type: type,
            isSkiped: isSkip,
            categID: categID
        });
        if (!isSkip) {
            if (type == "formation") {
                const { startDay, endDay, inscriptionEndDay, isLimited, nbrParticipat } = req.body.dataType
                const formation = await db.formation.create({
                    startDate: startDay,
                    endDate: endDay,
                    isLimited: isLimited,
                    nbrStudent: nbrParticipat,
                    progId: program.ID_ROWID
                });
                program.EndInsciptionDate = inscriptionEndDay;
                program.save();
            }
            else if (type == "cour") {
                const { inscriptionEndDay, nbrSession, hoursBySession } = req.body.dataType
                const cour = await db.cour.create({
                    sessionTiming: hoursBySession,
                    sessionsNumber: nbrSession,
                    progId: program.ID_ROWID
                });
                program.EndInsciptionDate = inscriptionEndDay;
                program.save();
            }
        }
        // Return a success message along with the ID of the newly created program
        return res.send({
            message: `Program '${title}' has been added successfully.`,
            program: program,
            code: 200
        });

    } catch (error) {
        console.log(error);
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
        const { title, discription, categID } = req.body.data;

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
            categID: categID
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

// ... your existing imports and functions

const findNonSkippedPrograms = async (req, res, next) => {
    try {
        const nonSkippedPrograms = await db.program.findAll({
            where: {
                isSkiped: false
            }
        });
        
        return res.send({
            message: "List of non-skipped programs.",
            programs: nonSkippedPrograms,
            code: 200
        });
    } catch (error) {
        return res.send({
            message: "An error occurred while fetching non-skipped programs.",
            error: error.message,
            code: 400
        });
    }
};

const listRegistrablePrograms = async (req, res, next) => {
    try {
        const currentDate = new Date();
        
        const registrablePrograms = await db.program.findAll({
            where: {
                isSkiped: false,
                PublishedDate: {
                    [op.lt]: currentDate  // less than current date
                },
                EndInsciptionDate: {
                    [op.gt]: currentDate  // greater than current date
                }
            }
        });

        return res.send({
            message: "List of registrable programs.",
            programs: registrablePrograms,
            code: 200
        });
    } catch (error) {
        return res.send({
            message: "An error occurred while fetching registrable programs.",
            error: error.message,
            code: 400
        });
    }
};

module.exports = {
    addProgram,
    updateProgram,
    removeProgram,
    findNonSkippedPrograms,  // added
    listRegistrablePrograms  // added
};

