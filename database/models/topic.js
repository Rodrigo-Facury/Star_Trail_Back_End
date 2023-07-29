'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Topic = sequelize.define('Topic', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Topic.associate = (models) => {
    Topic.belongsToMany(models.Trail, {
      through: 'TrailTopic',
      foreignKey: 'topicId',
    });
  };

  return Topic;
};
