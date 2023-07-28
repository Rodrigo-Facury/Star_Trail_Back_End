const WhistleBlowUpdate = (sequelize, DataTypes) => {
  const WhistleBlowUpdate = sequelize.define('WhistleBlowUpdate', {
    udDocumentsDirectory: DataTypes.STRING,
    udstatus: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    category: DataTypes.STRING,
    urgency: DataTypes.STRING,
    severity: DataTypes.STRING,
    validation: DataTypes.STRING,
    wbAction: DataTypes.STRING,
    endDate: DataTypes.DATE,
    opinion: DataTypes.STRING,
    tcReportsDirectory: DataTypes.STRING
  }, {
    tableName: 'WhistleBlowUpdates'
  });

  WhistleBlowUpdate.associate = (models) => {
    WhistleBlowUpdate.belongsTo(models.WhistleBlow, {
      foreignKey: 'wbId',
      as: 'whistleBlow'
    });

    WhistleBlowUpdate.belongsTo(models.Role, {
      foreignKey: 'areaId',
      as: 'area'
    });

    WhistleBlowUpdate.hasMany(models.WhistleBlowInvolved, {
      foreignKey: 'wbUId',
      as: 'involved'
    });
  };

  return WhistleBlowUpdate;
};

module.exports = WhistleBlowUpdate;