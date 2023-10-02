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
            type: DataTypes.STRING,
            allowNull: true
        },
        capacité: {
            type: DataTypes.BIGINT,
            allowNull: true
        }

    },);
    classe.associate = models => {
        classe.belongsToMany(models.groupe, {
            through: models.session,
            foreignKey: 'classID', // Using the correct primary key name for program
        });
    }
    return classe;
};