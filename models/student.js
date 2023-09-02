const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const student = sequelize.define('student', {
        StudentID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Assuming default value as 'false' if not provided
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
    student.associate = models => {
        student.belongsTo(models.person, {
            as: 'personProfile2', // An alias for this relation
            foreignKey: 'personId',
            onDelete: 'CASCADE' // If a user is deleted, the related person profile remains (you can adjust this behavior as needed)
        });
        student.belongsToMany(models.program, {
            through: models.registration,
            foreignKey: 'StudentID', // Using the correct primary key name for student
            otherKey: 'ID_ROWID',    // Using the correct primary key name for program
            as: 'programs'
        });
        // //create an ID_ROWID ref to the the last modification (updatedBy)
        // address.belongsTo(models.user, {
        //     foreignKey: {
        //         name: 'updatedBy',
        //         allowNull: true
        //     }
        // });
    }
   return student;
};