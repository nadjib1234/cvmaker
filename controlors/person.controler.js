const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();
// because we will use it many time i made it as a separated function
async function addPerson(data) {
    try {
        const { firstName, lastName, mail, phoneNumber, dateOfBirth, image } = data;
        if (!firstName || !lastName || !mail || !phoneNumber || !dateOfBirth) {
            return {
                message: "Error! There is missing data",
                code: 400
            };
        }
        if (image) {

        }
        const existingUser = await db.person.findOne({ where: { mail: mail } });

        if (existingUser) {
            return {
                message: 'Email already in use',
                code: 409
            };
        }

        const person = await db.person.create({
            firstName,
            lastName,
            mail,
            phoneNumber,
            dateOfBirth
        });

        return person.ID_ROWID;
    } catch (error) {
        console.error(error);
        return {
            message: "An error occurred",
            error: error.message,
            code: 400
        };
    }
}

module.exports = {
    addPerson,
};