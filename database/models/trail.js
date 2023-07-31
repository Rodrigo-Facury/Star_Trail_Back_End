'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Trail = sequelize.define('Trail', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Trail.associate = (models) => {
    Trail.belongsToMany(models.Topic, {
      through: 'TrailTopic',
      foreignKey: 'trailId',
    });

    Trail.belongsToMany(models.User, {
      through: 'Star',
      foreignKey: 'trailId',
    });
  };

  return Trail;
};
