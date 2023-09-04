const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const program = sequelize.define('program', {
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
        PublishedDate: {
            type: DataTypes.DATEONLY,
            allowNull: true // Assuming this is optional
        },
        EndInsciptionDate: {
            type: DataTypes.DATEONLY,
            allowNull: true // Assuming this is optional
        }

    },);
    program.associate = models => {
        // program belong to one categorie
        program.belongsTo(models.categorie, {
            foreignKey: {
                name: 'progID',
                allowNull: true
            }
        });

        // many student regist in our programes
        program.belongsToMany(models.student, {
            through: models.registration,
            foreignKey: 'progID', // Using the correct primary key name for program
            otherKey: 'StudentID',  // Assuming the primary key name for student is StudentID
            as: 'students'
        });

    }
    return program;
};