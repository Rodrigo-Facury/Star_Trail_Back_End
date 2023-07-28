const WhistleBlowInvolved = (sequelize, DataTypes) => {
  const WhistleBlowInvolved = sequelize.define('WhistleBlowInvolved', {
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    comment: DataTypes.STRING,
    action: DataTypes.STRING,
  }, {
    tableName: 'WhistleBlowInvolveds'
  });

  WhistleBlowInvolved.associate = (models) => {
    WhistleBlowInvolved.belongsTo(models.WhistleBlowUpdate,
      { foreignKey: 'wbUId', as: 'whistleBlowUpdate' });
  };

  return WhistleBlowInvolved;
};

module.exports = WhistleBlowInvolved;
