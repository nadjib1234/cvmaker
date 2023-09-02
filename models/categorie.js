const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const categorie = sequelize.define('categorie', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
            
        },
        discription: {
            type: DataTypes.TEXT,
            allowNull: true
            
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Assuming default value as 'false' if not provided
        },
    },);
    categorie.associate = models => {
        // //create an ID_ROWID ref to the the last modification (updatedBy)
        // address.belongsTo(models.user, {
        //     foreignKey: {
        //         name: 'updatedBy',
        //         allowNull: true
        //     }
        // });
    }
   return categorie;
};