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
        }
    
    },);
    student.associate = models => {
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