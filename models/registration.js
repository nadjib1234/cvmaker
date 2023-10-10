const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const registration = sequelize.define('registration', {
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
        StudentID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'student',  // This refers to the table name 'student'
                key: 'ID_ROWID'
            }
        },
        progID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'program',  // This refers to the table name 'program'
                key: 'ID_ROWID'
            }
        }
    });

    // Define the associations
    registration.associate = models => {
        registration.belongsTo(models.student, {
            foreignKey: 'StudentID',
            as: 'students'
        });
        
        registration.belongsTo(models.program, {
            foreignKey: 'progID',
            as: 'programs'
        });
    };

    return registration;
};
