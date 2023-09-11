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
    
    });

    return registration;
};
