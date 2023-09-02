const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const person = sequelize.define('person', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true, // Assuming phone number is optional
            validate: {
                len: [10, 15] // Adjust this range as needed
            }
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true // Assuming this is optional
        }

    },);
    person.associate = models => {
        // //create an ID_ROWID ref to the the last modification (updatedBy)
        // address.belongsTo(models.user, {
        //     foreignKey: {
        //         name: 'updatedBy',
        //         allowNull: true
        //     }
        // });
    }
    return person;
};