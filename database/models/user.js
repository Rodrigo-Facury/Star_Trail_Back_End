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
      allowNull: false,
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Trail, {
      through: 'Star',
      foreignKey: 'userId'
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
