const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const registration = sequelize.define('registration', {
        // Assuming an auto-incremented primary key for the registrations table like wisso did
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        dateInscription: {
            type: DataTypes.DATE,
            allowNull: false
        },
        program_ID_ROWID: {
            type: DataTypes.BIGINT,
            references: {
                model: 'programs',
                key: 'ID_ROWID'
            }
        },
        student_StudentID: {
            type: DataTypes.BIGINT,
            references: {
                model: 'students',
                key: 'StudentID'
            }
        }
    });

    return registration;
};
