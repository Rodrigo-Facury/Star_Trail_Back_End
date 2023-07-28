const Company = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    corporateName: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    commercialPhoneNumber: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    type: DataTypes.STRING,
    priorDiligence: DataTypes.BOOLEAN,
    complianceRisk: DataTypes.STRING,
    scopeSummary: DataTypes.STRING,
    companyLogoUrl: DataTypes.STRING,
    implementationTimelineUrl: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    street: DataTypes.STRING,
    streetNumber: DataTypes.STRING,
    complement: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    economicActivityCodes: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    tableName: 'Companies'
  });

  Company.associate = (models) => {
    Company.hasMany(models.User,
      { foreignKey: 'companyId', as: 'users' });
  };

  Company.associate = (models) => {
    Company.hasOne(models.Prospect,
      { foreignKey: 'companyId', as: 'prospect' });
  };

  Company.associate = (models) => {
    Company.hasMany(models.Employee,
      { foreignKey: 'companyId', as: 'employees' });
  };

  Company.associate = (models) => {
    Company.hasMany(models.WhistleBlow,
      { foreignKey: 'companyId', as: 'whistleBlows' });
  };

  return Company;
};

module.exports = Company;
