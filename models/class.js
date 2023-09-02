const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const classe = sequelize.define('class', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        className: {
            type:DataTypes.STRING,
            allowNull: true
        },
        capacité:{
            type:DataTypes.BIGINT,
            allowNull:true
        }
    
    },);
    classe.associate = models => {
        // //create an ID_ROWID ref to the the last modification (updatedBy)
        // address.belongsTo(models.user, {
        //     foreignKey: {
        //         name: 'updatedBy',
        //         allowNull: true
        //     }
        // });
    }
   return classe;
};