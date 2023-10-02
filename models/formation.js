const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const formation = sequelize.define('formation', {
        // Assuming an auto-incremented primary key for the formations table like wisso did
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: true // Assuming this is optional
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: true // Assuming this is optional
        },
        isLimited: {
            type: DataTypes.BOOLEAN,
            allowNull: true // Assuming this is optional
        },
        nbrStudent: {
            type: DataTypes.BIGINT,
            allowNull: true // Assuming this is optional
        },
    });
    formation.associate = models => {
        formation.belongsTo(models.program,
            {
                foreignKey: 'progId',
                onDelete: 'CASCADE' // If a person is deleted, the related user is also deleted
            });
    }
    return formation;
};
