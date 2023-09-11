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
    message: DataTypes.STRING,
    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    goto: DataTypes.STRING
  }, {});

  return Notification;
};
