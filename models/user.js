const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('user', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
        isConnected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Assuming default value as 'false' if not provided
        },
        LastcnxDate: {
            type: DataTypes.DATEONLY,
            allowNull: true // Assuming this is optional
        },
        cnxToken:{
            type:DataTypes.STRING,
            allowNull:true
        },
        role:{
            type: DataTypes.ENUM('Admin','Manager','Teacher','Student'),
            allowNull:false
        }

    },);
    user.associate = models => {
        // //create an ID_ROWID ref to the the last modification (updatedBy)
        // address.belongsTo(models.user, {
        //     foreignKey: {
        //         name: 'updatedBy',
        //         allowNull: true
        //     }
        // });
    }
   return user;
};