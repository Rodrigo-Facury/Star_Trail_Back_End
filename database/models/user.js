'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicturePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Star, {
      foreignKey: 'userId',
      as: 'stars',
    });

    User.hasMany(models.Trail, {
      foreignKey: 'userId',
      as: 'trails',
    });

    User.belongsToMany(models.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'followedUserId'
    });

    User.belongsToMany(models.User, {
      through: 'Follow',
      as: 'Following',
      foreignKey: 'followerUserId'
    });
  };

  return User;
};
