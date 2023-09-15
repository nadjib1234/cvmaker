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
// add worker in defrent roles (admin, secretary)
const addUser = async (req, res, next) => {
    try {
        // get the data sent by the user request :
        // it has :
        // to create person :(firstName, lastName, mail, phoneNumber, dateOfBirth)
        // to create user we need to generat a code from his name and his date of birth
        const reqData = req.body.data;
        console.log(reqData);
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
        // create the user 
        await db.user.create({
            UserName: username,
            role: reqData.role,
            Password: hashedPassword,
            personId: result
        });
        await sendPassword(reqData.firstName, reqData.lastName, password, reqData.mail);
        return res.send({
            message: "This user has been added successfully to Your list of user",
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
// lister the workers
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await db.user.findAll({
            attributes: ['ID_ROWID', 'isConnected', 'role'],
            include: [{
                model: db.person,
                as: 'personProfile'
            }]
        });
        return res.send({
            message: "Usrs list",
            allUsers: allUsers,
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
// drop user
const removeUser = async (req, res, next) => {
    try {
        const userID = req.params.id;

        // Validation: Ensure a userID was provided
        if (!userID) {
            return res.send({
                message: "Error! user ID must be provided.",
                code: 400
            });
        }

        // Fetch the user
        const user = await db.user.findByPk(userID);
        if (!user) {
            return res.send({
                message: "Error! user not found.",
                code: 404
            });
        }

        // Remove the associated person from the database
        await db.person.destroy({
            where: { ID_ROWID: user.personId }
        });

        // Remove the user from the database
        await db.user.destroy({
            where: { ID_ROWID: userID }
        });
        //in order words i delete both user and person 
        // Return success message
        return res.send({
            message: "user removed successfully.",
            code: 200
        });

    } catch (error) {
        return res.send({
            message: "An error occurred while removing the user.",
            error: error.message,
            code: 400
        });
    }
};
const ExploreSearchUsers = async (req, res, next) => {
    try {
        const findKey = req.params.Key;

        if (!findKey) {
            return res.send({
                message: "No search key provided.",
                students: null,
                code: 200
            });
        }

        // Fetch all students with their associated person details
        const itemsForSearching = await db.user.findAll({
            include: [{
                model: db.person,
                as: 'personProfile',
                attributes: ['firstName', 'lastName', 'mail', 'phoneNumber', 'dateOfBirth']
            }]
        });

        // Setup the options for Fuse
        const options = {
            includeScore: true,
            keys: ['personProfile.firstName', 'personProfile.lastName', 'personProfile.mail', 'personProfile.phoneNumber']
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
// user profile
const getUserProfile = async (req, res, next) => {
    try {
        const userID = req.body.userID;
        if (!userID) {
            return {
                message: "Error! There is missing data",
                code: 400
            };
        }
        const user = await db.user.findByPk(userID, {
            include: [{
                model: db.person,
                as: 'personProfile'
            }]
        });
        return res.send({
            message: "Users profile",
            userData: user,
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
const updateGeneralUserData = async (req, res, next) => {
    try {
        const { userID, firstName, lastName, mail, phoneNumber, dateOfBirth } = req.body.data;
        if (!userID || !firstName || !lastName || !mail || !phoneNumber || !dateOfBirth) {
            return {
                message: "Error! There is missing data",
                code: 400
            };
        }
        const user = await db.user.findByPk(userID, {
            include: [{
                model: db.person,
                as: 'personProfile'
            }]
        });

        if (user && user.personProfile) {
            user.personProfile.firstName = firstName;
            user.personProfile.lastName = lastName;
            user.personProfile.mail = mail;
            user.personProfile.dateOfBirth = dateOfBirth;
            await user.personProfile.save();
        }
        return res.send({
            message: "User dara are updated",
            userData: user,
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
const updatePassword = async (req, res, next) => {
    try {
        const { userID, oldPSW, newPSW } = req.body.data;
        if (!userID || !oldPSW || !newPSW) {
            return {
                message: "Error! There is missing data",
                code: 400
            };
        }
        const user = await db.user.findByPk(userID);
        // find if the password is correct 
        if (user) {
            const passwordMatch = await bcrypt.compare(oldPSW, user.Password);
            if (!passwordMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            // hash the password
            const hashedPassword = await bcrypt.hash(newPSW, 10);
            user.password = hashedPassword;
            await user.save();
        }


        return res.send({
            message: "User dara are updated",
            userData: user,
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
    getAllUsers,
    removeUser,
    ExploreSearchUsers,
    getUserProfile,
    updateGeneralUserData,
    updatePassword
};