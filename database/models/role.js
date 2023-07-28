const Role = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    tableName: 'Roles'
  });

  return Role;
};

Role.associate = (models) => {
  Role.hasMany(models.WhistleBlowUpdate,
    { foreignKey: 'areaId', as: 'whistleBlowUpdates' });
};

module.exports = Role;
