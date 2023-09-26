const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

// Function to add a new class to the database
const addClass = async (req, res, next) => {
    try {
        const { className, capacité } = req.body.data;

        // Check if the necessary data is provided
        if (!className || !capacité) {
            return res.send({
                message: "Error! There is missing data.",
                code: 400
            });
        }

        // Creating a new class record in the database
        const newClass = await db.class.create({
            className: className,
            capacité: capacité
        });

        return res.send({
            message: `Class '${className}' has been added successfully.`,
            classId: newClass.ID_ROWID,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while adding the class.",
            error: error.message,
            code: 400
        });
    }
};

const updateClass = async (req, res, next) => {
    try {
        const classId = req.params.id;  // Assuming the class ID is passed as a parameter in the URL
        const { className, capacité } = req.body.data;

        if (!classId) {
            return res.send({
                message: "Error! Class ID is required for updating.",
                code: 400
            });
        }

        await db.class.update({
            className: className,
            capacité: capacité
        }, {
            where: { ID_ROWID: classId }
        });

        return res.send({
            message: "Class updated successfully!",
            code: 200
        });

    } catch (error) {
        console.log(error);
        return res.send({
            message: "An error occurred while updating the class.",
            error: error.message,
            code: 400
        });
    }
};

const deleteClass = async (req, res, next) => {
    try {
        const classId = req.params.id;  // Assuming the class ID is passed as a parameter in the URL

        if (!classId) {
            return res.send({
                message: "Error! Class ID is required for deletion.",
                code: 400
            });
        }

        await db.class.destroy({
            where: { ID_ROWID: classId }
        });

        return res.send({
            message: "Class deleted successfully!",
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while deleting the class.",
            error: error.message,
            code: 400
        });
    }
};

const allClasses = async (req, res, next) => {
    try {

        const allClasses = await db.class.findAll();
        return res.send({
            message: `fetshing the list of all classes.`,
            allClasses: allClasses,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while fetshing the class.",
            error: error.message,
            code: 400
        });
    }
};
module.exports = {
    addClass,
    updateClass,
    deleteClass,
    allClasses
};
