const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const teacher = sequelize.define('teacher', {
        TeacherID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            
        }
    
    },);
    teacher.associate = models => {
        // //create an ID_ROWID ref to the the last modification (updatedBy)
        // address.belongsTo(models.user, {
        //     foreignKey: {
        //         name: 'updatedBy',
        //         allowNull: true
        //     }
        // });
    }
   return teacher;
};