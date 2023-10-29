const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();

const addPayment = async (req, res, next) => {
    try {
        const { IDstudent, montant, Idprogram } = req.body.data;

        // Check if the necessary data is provided
        if (!IDstudent || !montant || !Idprogram) {
            return res.send({
                message: "Error! There is missing data.",
                code: 400
            });
        }

        // Check if the student is registered for the program
        const existingRegistration = await db.registration.findOne({
            where: {
                StudentID: IDstudent,
                progID: Idprogram
            }
        });

        if (!existingRegistration) {
            return res.send({
                message: "Error! The student is not registered for this program.",
                code: 400
            });
        }

        // Check if the student has already made a payment for this program
        const existingPayment = await db.payment.findOne({
            where: {
                StudentID: IDstudent,
                progID: Idprogram
            }
        });

        if (existingPayment) {
            return res.send({
                message: "Error! The student has already made a payment for this program.",
                code: 409
            });
        }

        // Creating a new payment record in the database
        const newPayment = await db.payment.create({
            montant: montant,
            progID: Idprogram,
            StudentID: IDstudent
        });

        return res.send({
            message: `The payment has been added successfully.`,
            paymentId: newPayment.ID_ROWID,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while adding the payment.",
            error: error.message,
            code: 400
        });
    }
};


const removePayment = async (req, res, next) => {
    try {
        const paymentId = req.params.id;

        if (!paymentId) {
            return res.status(400).json({
                message: "Error! Payment ID is required for deletion.",
                code: 400
            });
        }

        const deletedPayment = await db.payment.destroy({
            where: { ID_ROWID: paymentId }
        });

        if (!deletedPayment) {
            return res.status(404).json({
                message: "Error! Payment not found.",
                code: 404
            });
        }

        return res.status(200).json({
            message: "Payment deleted successfully!",
            code: 200
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while deleting the payment.",
            error: error.message,
            code: 500
        });
    }
};

const listPayments = async (req, res, next) => {
    try {
        const payments = await db.payment.findAll({
            include: [
                {
                    model: db.student,
                    as: 'students',
                    include: [{
                        model: db.person,
                        as: 'personProfile2',
                        attributes: ['firstName', 'lastName', 'mail', 'phoneNumber', 'dateOfBirth']
                    }]
                },
                {
                    model: db.program,
                    as: 'programs',
                    attributes: ['ID_ROWID', 'title']
                }
            ]
        });

        if (!payments) {
            return res.send({
                message: "No payments found.",
                code: 404
            });
        }

        return res.send({
            message: "Payments fetched successfully.",
            payments: payments,
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while fetching the payments.",
            error: error.message,
            code: 400
        });
    }
};

const getStudentsForProgramPayments = async (req, res, next) => {
    try {
        const programId = req.params.id;

        if (!programId) {
            return res.status(400).json({
                message: "Error! Program ID is required.",
                code: 400
            });
        }

        const payments = await db.payment.findAll({
            where: { progID: programId },
            include: [{
                model: db.student,
                as: 'students',
                include: [{
                    model: db.person,
                    as: 'personProfile2',
                    attributes: ['firstName', 'lastName', 'mail', 'phoneNumber', 'dateOfBirth']
                }]
            }]
        });

        const students = payments.map(pay => {
            const student = pay.students;
            return {
                id: student.ID_ROWID,
                name: `${student.personProfile2.firstName} ${student.personProfile2.lastName}`,
                phone: student.personProfile2.phoneNumber,
                email: student.personProfile2.mail,
                dateOfBirth: student.personProfile2.dateOfBirth,
                montant: pay.montant
            };
        });

        return res.status(200).json({
            message: "Students with payments fetched successfully.",
            students: students,
            code: 200
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching students for the program payments.",
            error: error.message,
            code: 500
        });
    }
};

module.exports = {
    addPayment,
    removePayment,
    listPayments,
    getStudentsForProgramPayments
};