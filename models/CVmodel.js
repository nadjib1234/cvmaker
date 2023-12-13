// models/CVModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CVModel = sequelize.define('CV', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING, // Adjust the data type according to your needs
      allowNull: true,
    },
    education: {
      type: DataTypes.STRING, // Adjust the data type according to your needs
      allowNull: true,
    },
    experience: {
      type: DataTypes.STRING, // Adjust the data type according to your needs
      allowNull: true,
    },
  });

  return CVModel;
};
