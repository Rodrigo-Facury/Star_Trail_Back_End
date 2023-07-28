module.exports = (sequelize, _DataTypes) => {
  const UserRole = sequelize.define('UserRole', {});

  UserRole.associate = (models) => {
    models.User.belongsToMany(models.Role, {
      as: 'roles',
      through: UserRole,
      foreignKey: 'userId',
      otherKey: 'roleId',
    });
    models.Role.belongsToMany(models.User, {
      as: 'users',
      through: UserRole,
      foreignKey: 'roleId',
      otherKey: 'userId',
    });
  };

  return UserRole;
};