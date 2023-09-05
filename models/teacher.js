const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const teacher = sequelize.define('teacher', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        
        TeacherID: {
            type: DataTypes.BIGINT,
            unique:true,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,

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
    teacher.associate = models => {
        teacher.belongsTo(models.person, {
            as: 'personProfile2', // An alias for this relation
            foreignKey: 'personId',
            onDelete: 'CASCADE' // If a user is deleted, the related person profile remains 
        });
        // A teacher can be responsibale of many Groups 
        teacher.belongsToMany(models.groupe, {
            through: models.teacherGroup,
            foreignKey: 'TeacherID', // Using the correct primary key name for teacher
        });
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