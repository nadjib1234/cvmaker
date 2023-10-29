const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    const payment = sequelize.define('payment', {
        ID_ROWID: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        montant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Payment amount"
        },
        StudentID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'student',  // This refers to the table name 'student'
                key: 'ID_ROWID'
            }
        },
        progID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'program',  // This refers to the table name 'program'
                key: 'ID_ROWID'
            }
        }
    });

    // Define the associations
    payment.associate = models => {
        payment.belongsTo(models.student, {
            foreignKey: 'StudentID',
            as: 'students'
        });

        payment.belongsTo(models.program, {
            foreignKey: 'progID',
            as: 'programs'
        });
    };

    return payment;
};
