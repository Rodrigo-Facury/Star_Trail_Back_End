module.exports = (sequelize, _DataTypes) => {
  const EmployeeRole = sequelize.define('EmployeeRole', {});

  EmployeeRole.associate = (models) => {
    models.Employee.belongsToMany(models.Role, {
      as: 'roles',
      through: EmployeeRole,
      foreignKey: 'employeeId',
      otherKey: 'roleId',
    });
    models.Role.belongsToMany(models.Employee, {
      as: 'employees',
      through: EmployeeRole,
      foreignKey: 'roleId',
      otherKey: 'employeeId',
    });
  };

  return EmployeeRole;
};