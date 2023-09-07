const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

// Function to add a new session to the database
async function addSession(data) {
    const { Startat, EndsAt, date } = data;

    // Check if the necessary data is provided
    if (!Startat || !EndsAt || !date) {
        return {
            message: "Error! There is missing data",
            code: 400
        };
    }

    // Creating a new session record in the database
    const newSession = await db.session.create({
        Startat: Startat,
        EndsAt: EndsAt,
        date: date
    });

    // Return the ID of the newly created session for potential further use
    return newSession.ID_ROWID;
}

async function updateSession(sessionId, data) {
    const { Startat, EndsAt, date } = data;

    // Check if sessionId is provided
    if (!sessionId) {
        return {
            message: "Error! session ID is required for updating.",
            code: 400
        };
    }

    // Update the session record in the database
    await db.session.update({
        Startat: Startat,
        EndsAt: EndsAt,
        date: date
    }, {
        where: { ID_ROWID: sessionId }
    });

    return {
        message: "Session updated successfully!",
        code: 200
    };
}

// Function to delete a session from the database
async function deleteSession(sessionId) {
    // Check if sessionId is provided
    if (!sessionId) {
        return {
            message: "Error! session ID is required for deletion.",
            code: 400
        };
    }

    // Delete the session record from the database
    await db.session.destroy({
        where: { ID_ROWID: sessionId }
    });

    return {
        message: "Session deleted successfully!",
        code: 200
    };
}

module.exports = {
    addSession,
    updateSession,
    deleteSession
};

