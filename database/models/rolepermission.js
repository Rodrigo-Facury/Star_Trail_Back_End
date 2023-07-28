module.exports = (sequelize, _DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {});

  RolePermission.associate = (models) => {
    models.Role.belongsToMany(models.WebsiteModule, {
      as: 'modules',
      through: RolePermission,
      foreignKey: 'roleId',
      otherKey: 'moduleId',
    });
    models.WebsiteModule.belongsToMany(models.Role, {
      as: 'roles',
      through: RolePermission,
      foreignKey: 'moduleId',
      otherKey: 'roleId',
    });
  };

  return RolePermission;
};