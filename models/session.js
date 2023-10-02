const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const session = sequelize.define('session', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        Startat: {
            type: DataTypes.TIME,
            allowNull: true

        },
        EndsAt: {
            type: DataTypes.TIME,
            allowNull: true

        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true // Assuming this is optional
        }

    },);
    session.associate = models => {
    }
    return session;
};