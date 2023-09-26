const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const cour = sequelize.define('cour', {
        // Assuming an auto-incremented primary key for the cours table like wisso did
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        sessionTiming: {
            type: DataTypes.TIME,
            allowNull: true // Assuming this is optional
        },
        sessionsNumber: {
            type: DataTypes.BIGINT,
            allowNull: true // Assuming this is optional
        },
        timing: { // les hours de touts le programe
            type: DataTypes.TIME,
            allowNull: true // Assuming this is optional
        },
    });
    cour.associate = models => {
        cour.hasOne(models.program, {
            foreignKey: 'courId',
            onDelete: 'CASCADE' // If a person is deleted, the related user is also deleted
        });
    }
    return cour;
};
