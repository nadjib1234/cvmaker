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
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING(150),
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
        cnxToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Manager', 'Teacher', 'Student'),
            allowNull: false
        },
        personId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'people',  // This refers to the table name 'persons'
                key: 'ID_ROWID'
            }
        }

    },);
    user.associate = models => {
        user.belongsTo(models.person, {
            as: 'personProfile', // An alias for this relation
            foreignKey: 'personId',
            onDelete: 'CASCADE' // If a user is deleted, the related person profile remains (you can adjust this behavior as needed)
        });

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