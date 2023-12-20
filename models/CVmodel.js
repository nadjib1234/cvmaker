// models/CVModel.js
const Sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
  const CVModel = sequelize.define('CV', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: true
    },
    education: {
      type: DataTypes.STRING,
      allowNull: true
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

  return CVModel
}
