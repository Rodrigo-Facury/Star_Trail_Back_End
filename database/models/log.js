const Log = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    action: DataTypes.STRING,
    clientId: { type: DataTypes.INTEGER, foreignKey: true },
    details: DataTypes.TEXT,
    table: DataTypes.STRING,
  }, {
    tableName: 'Logs'
  });

  Log.associate = (models) => {
    Log.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  Log.associate = (models) => {
    Log.belongsTo(models.Company,
      { foreignKey: 'clientId', as: 'client' });
  };

  return Log;
};

module.exports = Log;
