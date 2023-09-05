const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
const crypto = require('crypto');
require("dotenv").config();
const { addPerson } = require("./person.controler");
const generateStudentCode = (firstName, lastName, dateOfBirth) => {
    const currentDate = new Date().toISOString().split('T')[0];  // Gets the current date in 'YYYY-MM-DD' format
    
    // Combining the components
    const dataString = `${firstName}${lastName}${dateOfBirth}${currentDate}`;
    
    // Hashing the combined string
    const hash = crypto.createHash('sha256').update(dataString).digest('hex');
    
    // Taking the first 8 characters of the hash and converting it to an integer
    const intCode = parseInt(hash.substring(0, 8), 16);  // Convert from hexadecimal to integer
    
    return intCode;
}

const addTeacher = async (req, res, next) => {
    try {
        // get the data sent by the user request :
        // it has :
        // to create person :(firstName, lastName, mail, phoneNumber, dateOfBirth)
        // to create student we need to generat a code from his name and his date of birth
        const reqData = req.body.data;
        const personID = await addPerson(reqData);
        const suject = reqData.subject;
        // generat student code : an unique id we use to reference to the student but for security reason we do not use it as a table primary key
        // student code is available for others to see 
        // primary key is not available 
        const generatedCode = generateStudentCode(reqData.firstName, reqData.lastName, reqData.dateOfBirth);
        // find a way to create it using user first & last name , date of birth , the actual date 
        /******* */

        // create the student 
        await db.teacher.create({
            TeacherID:generatedCode,
            personId: personID,
            subject:suject
        })
        return res.send({
            message: "This user has been added successfully to Your list of teachers",
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
    addTeacher,
};

// const removeWorker = async (req, res, next) => {
//     try {
//         const { userID } = req.body;
//         // workerID the one we find by his email

//         if (!userID) {
//             return res.send({
//                 message: "error no data has been sent",
//                 code: 500,
//             });
//         }
//         await db.Workers.destroy({
//             where: {
//                 MWUID: userID,
//             },
//         });
//         const user = await db.Users.findByPk(userID);
//         user.is_staff = false;
//         user.save();

//         return res.send({
//             message:
//                 "This user has been Remove successfully from Your list of workers",
//             code: 200,
//         });
//     } catch (error) {
//         res.send({
//             message: "An error occurred",
//             error: error.message,
//             code: 400,
//         });
//         throw error;
//     }
// };
// // remove worker
