const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

const addStudentGroup = async (req, res, next) => {
    try {
        const { GroupeID, StudentID } = req.body.data;

        // Check if the necessary data is provided
        if (!GroupeID || !StudentID) {
            return res.send({
                message: "Error! GroupeID and StudentID are required.",
                code: 400
            });
        }

        // Creating a new record in the database
        const newStudentGroup = await db.studentGroup.create({
            GroupeID: GroupeID,
            StudentID: StudentID
        });

        return res.send({
            message: `Student-Group association added successfully.`,
            id: newStudentGroup.ID_ROWID,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while adding the Student-Group association.",
            error: error.message,
            code: 400
        });
    }
};

const removeStudentGroup = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.send({
                message: "Error! ID is required for deletion.",
                code: 400
            });
        }

        await db.studentGroup.destroy({
            where: { ID_ROWID: id }
        });

        return res.send({
            message: "Student-Group association deleted successfully!",
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while deleting the Student-Group association.",
            error: error.message,
            code: 400
        });
    }
};

module.exports = {
    addStudentGroup,

    removeStudentGroup
};
