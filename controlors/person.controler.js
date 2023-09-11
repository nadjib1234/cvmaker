const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();
// because we will use it many time i made it as a separated function
async function addPerson(data) {
    const { firstName, lastName, mail, phoneNumber, dateOfBirth } = data;
    if (!firstName || !lastName || !mail || !phoneNumber || !dateOfBirth) {
        return res.send({
            message: "Error! There is a messing data",
            code: 400
        });
    }
    // Check if the user already exists
    const existingUser = await db.person.findOne({ mail });

    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }
    const person = await db.person.create({
        firstName: firstName,
        lastName: lastName,
        mail: mail,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth
    });
    // return the created user ID to use it later
    return person.ID_ROWID;
}
module.exports = {
    addPerson,
};