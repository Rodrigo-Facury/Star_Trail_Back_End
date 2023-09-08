'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      foreignKey: 'userId'
    },
    message: DataTypes.STRING
  }, {});

  return Notification;
};
