const WhistleBlow = (sequelize, DataTypes) => {
  const WhistleBlow = sequelize.define('WhistleBlow', {
    key: DataTypes.STRING,
    companyId: { type: DataTypes.INTEGER, foreignKey: true },
    text: DataTypes.STRING,
    whistleBlowersName: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    documentsDirectory: { type: DataTypes.STRING, allowNull: true },
    status: DataTypes.STRING,
    whistleBlowersCompany: DataTypes.STRING,
    email: DataTypes.STRING,
    channel: DataTypes.STRING
  }, {
    tableName: 'WhistleBlows'
  });

  WhistleBlow.associate = (models) => {
    WhistleBlow.belongsTo(models.Company,
      { foreignKey: 'companyId', as: 'company' });
  };

  WhistleBlow.associate = (models) => {
    WhistleBlow.hasMany(models.WhistleBlowUpdate,
      { foreignKey: 'wbId', as: 'whistleBlowUpdates' });
  };

  return WhistleBlow;
};

module.exports = WhistleBlow;
