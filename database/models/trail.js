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

    Trail.hasMany(models.Star, {
      foreignKey: 'trailId',
      as: 'stars',
    });

    Trail.hasMany(models.Step, {
      foreignKey: 'trailId',
      as: 'steps'
    });

    Trail.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator'
    });
  };

  return Trail;
};
