const db = require("../../models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();
// const addWorker = async (req, res, next) => {
//     try {
//         const { instID, workerID } = req.body.data;
//         // workerID the one we find by his email

//         if (!instID || !workerID) {
//             return res.send({
//                 message: "error no data has been sent",
//                 code: 500,
//             });
//         }
//         await db.Workers.create({
//             MWUID: workerID,
//             MWUIID: instID,
//         });
//         const user = await db.Users.findByPk(workerID);
//         user.is_staff = true;
//         user.MUMPID = 4; // set new worker with profile 4 InstWorker
//         user.save();
//         return res.send({
//             message: "This user has been added successfully to Your list of workers",
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
// module.exports = {
//     addWorker,
//     removeWorker,
// };