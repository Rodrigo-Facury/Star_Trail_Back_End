const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Follow = sequelize.define('Follow', {
    followerUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Follow;
};
