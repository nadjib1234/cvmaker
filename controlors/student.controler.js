const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
const crypto = require('crypto');
require("dotenv").config();
const { addPerson } = require("./person.controler");
const { generateStudentCode } = require("./generator");
const addStudent = async (req, res, next) => {
    try {
        // get the data sent by the user request :
        // it has :
        // to create person :(firstName, lastName, mail, phoneNumber, dateOfBirth)
        // to create student we need to generat a code from his name and his date of birth
        const reqData = req.body.data;
        const personID = await addPerson(reqData);

        // generat student code : an unique id we use to reference to the student but for security reason we do not use it as a table primary key
        // student code is available for others to see 
        // primary key is not available 
        const generatedCode = generateStudentCode(reqData.firstName, reqData.lastName, reqData.dateOfBirth);
        // find a way to create it using user first & last name , date of birth , the actual date 
        /******* */

        // create the student 
        await db.student.create({
            studentCode: generatedCode,
            personId: personID
        })
        return res.send({
            message: "This user has been added successfully to Your list of student",
            code: 200,
        });
    } catch (error) {
        res.send({
            message: "An error occurred",
            error: error.message,
            code: 400,
        });
        throw error;
    }
}
module.exports = {
    addStudent,
};