const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

// Function to add a new group to the database
const addGroupe = async (req, res, next) => {
    try {
        const { GroupeName } = req.body.data;

        // Check if the necessary data (group name) is provided
        if (!GroupeName) {
            return res.send({
                message: "Error! Group name is missing.",
                code: 400
            });
        }

        // Creating a new group record in the database
        const newGroupe = await db.groupe.create({
            GroupeName: GroupeName
        });

        return res.send({
            message: `Group '${GroupeName}' has been added successfully.`,
            groupId: newGroupe.ID_ROWID,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while adding the group.",
            error: error.message,
            code: 400
        });
    }
};

// Function to remove a group from the database
const removeGroupe = async (req, res, next) => {
    try {
        const groupId = req.params.id; // Assuming the group ID is passed as a parameter in the URL

        if (!groupId) {
            return res.send({
                message: "Error! Group ID is required for deletion.",
                code: 400
            });
        }

        await db.groupe.destroy({
            where: { ID_ROWID: groupId }
        });

        return res.send({
            message: "Group deleted successfully!",
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while deleting the group.",
            error: error.message,
            code: 400
        });
    }
};
// Function to update a group in the database
const updateGroupe = async (req, res, next) => {
    try {
        const groupId = req.params.id; // Assuming the group ID is passed as a parameter in the URL
        const { GroupeName } = req.body.data;

        if (!groupId) {
            return res.send({
                message: "Error! Group ID is required for updating.",
                code: 400
            });
        }

        await db.groupe.update({
            GroupeName: GroupeName
        }, {
            where: { ID_ROWID: groupId }
        });

        return res.send({
            message: "Group updated successfully!",
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while updating the group.",
            error: error.message,
            code: 400
        });
    }
};
// Exporting the functions
module.exports = {
    addGroupe,
    removeGroupe,
    updateGroupe
};