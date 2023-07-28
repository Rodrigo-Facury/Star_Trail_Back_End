const Prospect = (sequelize, DataTypes) => {
  const Prospect = sequelize.define('Prospect', {
    companyId: { type: DataTypes.INTEGER, foreignKey: true },
    tradingName: DataTypes.STRING,
    contact: DataTypes.STRING,
    followUpDate: DataTypes.DATE,
    status: DataTypes.STRING,
    email: DataTypes.STRING,
    notes: DataTypes.STRING,
    negotiatingWith: DataTypes.STRING,
    paymentDue: DataTypes.INTEGER,
    implementationFee: DataTypes.FLOAT,
    serviceFee: DataTypes.FLOAT
  }, {
    tableName: 'Prospects'
  });

  Prospect.associate = (models) => {
    Prospect.belongsTo(models.Company,
      { foreignKey: 'companyId', as: 'company' });
  };

  return Prospect;
};

module.exports = Prospect;
