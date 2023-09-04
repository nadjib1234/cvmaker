const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const teacherGroup = sequelize.define('teacherGroup', {
        // Assuming an auto-incremented primary key for the registrations table like wisso did
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
    });

    return teacherGroup;
};
