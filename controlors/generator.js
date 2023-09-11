const db = require(".././models");
const seq = require("sequelize");
const op = seq.Op;
require("dotenv").config();
// because we will use it many time i made it as a separated function
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
function generateUniqueUsername(firstName, lastName) {
    // Remove any whitespace and convert names to lowercase
    const sanitizedFirstName = firstName.trim().toLowerCase();
    const sanitizedLastName = lastName.trim().toLowerCase();

    // Generate a unique identifier (e.g., a timestamp)
    const uniqueIdentifier = Date.now();

    // Combine first name, last name, and unique identifier to create the username
    const username = `${sanitizedFirstName}_${sanitizedLastName}_${uniqueIdentifier}`;
    // Shorten the username if it exceeds 100 characters
    if (username.length > 100) {
        username = username.substring(0, 100);
    }
    return username;
}
module.exports = {
    generateStudentCode,
    generateUniqueUsername,
};