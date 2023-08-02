const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Star = sequelize.define('Star', {
    trailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Star;
};
