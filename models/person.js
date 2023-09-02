const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const person = sequelize.define('person', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },

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