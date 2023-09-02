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
            type: DataTypes.BIGINT,
            allowNull: true
            
        },
        EndsAt: {
            type: DataTypes.BIGINT,
            allowNull: true
            
        },
        date:{
            type: DataTypes.DATEONLY,
            allowNull: true // Assuming this is optional
        }
    
    },);
    session.associate = models => {
        // //create an ID_ROWID ref to the the last modification (updatedBy)
        // address.belongsTo(models.user, {
        //     foreignKey: {
        //         name: 'updatedBy',
        //         allowNull: true
        //     }
        // });
    }
   return session;
};