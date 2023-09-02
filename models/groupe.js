const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const groupe = sequelize.define('groupe', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        GroupeName: {
            type:DataTypes.STRING,
            allowNull: true
        }
    
    },);
    groupe.associate = models => {
        // //create an ID_ROWID ref to the the last modification (updatedBy)
        // address.belongsTo(models.user, {
        //     foreignKey: {
        //         name: 'updatedBy',
        //         allowNull: true
        //     }
        // });
    }
   return groupe;
};