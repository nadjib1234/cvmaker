const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

const addRegistration = async (req, res, next) => {
    try {
        const { IDstudent,date,Idprogram } = req.body.data;
             console.log(IDstudent + Idprogram + date);
        // Check if the necessary data is provided
        if (!IDstudent || !date || !Idprogram) {
            return res.send({
                message: "Error! There is missing data.",
                code: 400
            });
        }
        // Creating a new class record in the database
        const newregistration = await db.registration.create({
            dateInscription:date,
            progID:Idprogram,
            StudentID:IDstudent

        })
        return res.send({
            message: `the registration has been added successfully.`,
          classId: newregistration.ID_ROWID,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while adding the regisration.",
            error: error.message,
            code: 400
        });
    }
};

/**
 * Delete a registration from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

const removeRegistration = async (req, res, next) => {
    try {
        const registrationId = req.params.id; // Assuming the registration ID is passed as a parameter in the URL

        if (!registrationId) {
            return res.send({
                message: "Error! Registration ID is required for deletion.",
                code: 400
            });
        }

        await db.registration.destroy({
            where: { ID_ROWID: registrationId }
        });

        return res.send({
            message: "Registration deleted successfully!",
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while deleting the registration.",
            error: error.message,
            code: 400
        });
    }
};

// Exporting the functions so they can be used elsewhere
module.exports = {
    addRegistration,
    removeRegistration
};