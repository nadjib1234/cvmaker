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
        isSubCategory: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Assuming default value as 'false' if not provided
        },
        supperCatID: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
    },);
    categorie.associate = models => {

        // a categorie can have many programes
        categorie.hasMany(models.program, {
            foreignKey: {
                name: 'progID',
                allowNull: true
            }
        });
    }
    return categorie;
};