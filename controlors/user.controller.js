const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
const bcrypt = require('bcrypt');
require("dotenv").config();
const { addPerson } = require("./person.controler");
const { generateUniqueUsername } = require("./generator");
const sendM = require("./email.controler");
const passwordGenerator = require("password-generator");
function sendPassword(firstName, last_name, password, email) {
    const subject = "Your Account Is Created Successfully";
    sendM.sendEmail(email, subject, {
        Fname: firstName + " " + last_name,
        Message:
            "Your account user in our Platform  has been created. Please Log in by this password :" +
            password +
            " .",
        Url: null,
    });
}
const addUser = async (req, res, next) => {
    try {
        // get the data sent by the user request :
        // it has :
        // to create person :(firstName, lastName, mail, phoneNumber, dateOfBirth)
        // to create student we need to generat a code from his name and his date of birth
        const reqData = req.body.data;
        const result = await addPerson(reqData);
        if (result.code === 400 || result.code === 409) {
            return res.send({
                message: "An error occurred",
                error: result.message,
                code: result.code,
            });
        }
        // create a user name :
        const username = generateUniqueUsername(reqData.firstName, reqData.lastName);
        /******* */
        // generate pasword 
        const password = passwordGenerator(8, false);
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create the student 
        await db.user.create({
            UserName: username,
            role: reqData.role,
            Password: hashedPassword,
            personId: result
        });
        await sendPassword(reqData.firstName, reqData.lastName, password, reqData.mail);
        return res.send({
            message: "This user has been added successfully to Your list of student",
            code: 200,
        });
    } catch (error) {
        return res.send({
            message: "An error occurred",
            error: error.message,
            code: 400,
        });

    }
}
module.exports = {
    addUser,
};