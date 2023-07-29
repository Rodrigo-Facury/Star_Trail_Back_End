'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Step = sequelize.define('Step', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Trail',
        key: 'id'
      },
      foreignKey: 'trailId'
    }
  });

  return Step;
};
