const Employee = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    companyId: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    tableName: 'Employees'
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Company,
      { foreignKey: 'companyId', as: 'company' });
  };

  return Employee;
};

module.exports = Employee;
