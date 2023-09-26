const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const groupe = sequelize.define('groupe', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        GroupeName: {
            type: DataTypes.STRING,
            allowNull: true
        }

    },);
    groupe.associate = models => {
        // a group can have many responsibale teachers
        groupe.belongsToMany(models.teacher, {
            through: models.teacherGroup,
            foreignKey: 'GroupeID', // Using the correct primary key name for teacher
        });
        // a group can have many students
        groupe.belongsToMany(models.student, {
            through: models.studentGroup,
            foreignKey: 'GroupeID', // Using the correct primary key name for teacher
        });
        // group has many session in salle
        groupe.belongsToMany(models.class, {
            through: models.session,
            foreignKey: 'groupID', // Using the correct primary key name for student
        });
        groupe.belongsTo(models.program, {
            foreignKey: {
                name: 'categID',
                allowNull: true
            }
        });
    }
    return groupe;
};