const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
const crypto = require('crypto');
const Fuse = require('fuse.js');
require("dotenv").config();
const { addPerson } = require("./person.controler");
const { generateStudentCode,checkIfCodeExists } = require("./generator");
const addStudent = async (req, res, next) => {
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
        let generatedCode = generateStudentCode(reqData.firstName, reqData.lastName, reqData.dateOfBirth, reqData.email);
        
        // Check if the generated code exists, if yes, then keep generating a new one until it's unique
        while (await checkIfCodeExists(generatedCode)) {
            // Alter the generated code in some way to ensure uniqueness. This could be adding a random number, or using another mechanism.
            // For this example, I'm simply appending a random number to it. 
            // You might want to modify the generateStudentCode function or come up with a different mechanism for this.
            generatedCode = generateStudentCode(reqData.firstName, reqData.lastName, reqData.dateOfBirth, reqData.email) + Math.floor(Math.random() * 1000);}

        // create the student 
        await db.student.create({
            studentCode: generatedCode,
            personId: result
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
const updateStudent = async (req, res, next) => {
    try {
        const data = req.body.data;  // Extracting the data object directly
        const sudentid = req.params.id;
        // Check if studentID is provided
        if (!sudentid) {
            return res.send({
                message: "Error! StudentID is required for updating.",
                code: 400
            });
        }
        // Get the personId for the student
        const studentRecord = await db.student.findOne({ where: { ID_ROWID: sudentid } });

        // Now update the person using the personId from the student record
        await db.person.update({
            firstName: data.firstName,
            lastName: data.lastName,
            mail: data.mail,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth
        }, {
            where: { ID_ROWID: studentRecord.personId }
        });
        await db.student.update({
            isActive:data.status
        },{
            where: { ID_ROWID:sudentid}
        
        })
        return res.send({
            message: `Student '${data.firstName} ${data.lastName}' has been updated successfully.`,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while updating the student.",
            error: error.message,
            code: 400
        });
    }
};
const removeStudent = async (req, res, next) => {
    try {
        const studentID = req.params.id;

        // Validation: Ensure a studentID was provided
        if (!studentID) {
            return res.send({
                message: "Error! Student ID must be provided.",
                code: 400
            });
        }

        // Fetch the student
        const student = await db.student.findByPk(studentID);
        if (!student) {
            return res.send({
                message: "Error! Student not found.",
                code: 404
            });
        }

        // Remove the associated person from the database
        await db.person.destroy({
            where: { ID_ROWID: student.personId }
        });

        // Remove the student from the database
        await db.student.destroy({
            where: { ID_ROWID: studentID }
        });
        //in order words i delete both student and person 
        // Return success message
        return res.send({
            message: "Student removed successfully.",
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while removing the student.",
            error: error.message,
            code: 400
        });
    }
};
const listStudents = async (req, res, next) => {
    try {
        // Fetching all students from the database
        const students = await db.student.findAll({
            include: [ // Assuming you want to also fetch the associated person details for each student
                {
                    model: db.person,
                    as: 'personProfile2',  // Alias you set in associations
                    attributes: ['firstName', 'lastName', 'mail', 'phoneNumber', 'dateOfBirth'] // specify the attributes you want

                }
            ]
        });

        // Return the list of students
        return res.send({
            message: "List of all students",
            students: students,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while fetching the list of students.",
            error: error.message,
            code: 400
        });
    }
};
const ExploreSearch = async (req, res, next) => {
    try {
        const findKey = req.body.Key;

        if (!findKey) {
            return res.send({
                message: "No search key provided.",
                students: null,
                code: 200
            });
        }

        // Fetch all students with their associated person details
        const itemsForSearching = await db.student.findAll({
            attributes: ['studentCode'],
            include: [{
                model: db.person,
                as: 'personProfile2',
                attributes: ['firstName', 'lastName', 'mail', 'phoneNumber', 'dateOfBirth']
            }]
        });

        // Setup the options for Fuse
        const options = {
            includeScore: true,
            keys: ['personProfile2.firstName', 'personProfile2.lastName', 'personProfile2.mail', 'personProfile2.phoneNumber']
        };

        const fuse = new Fuse(itemsForSearching, options);
        const result = fuse.search(findKey);

        // Extract the items from the Fuse result
        const filteredItems = result.map(item => item.item.toJSON());
        return res.send({
            message: "Search results",
            students: filteredItems,
            code: 200
        });
        // Return the filtered items

    } catch (error) {
        return res.send({
            message: "An error occurred during the search.",
            error: error.message,
            code: 400
        });
    }
};
module.exports = {
    addStudent,
    updateStudent,
    removeStudent,
    listStudents,
    ExploreSearch
};
