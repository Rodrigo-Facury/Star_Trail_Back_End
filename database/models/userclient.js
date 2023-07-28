module.exports = (sequelize, _DataTypes) => {
  const UserClient = sequelize.define('UserClient', {});

  UserClient.associate = (models) => {
    models.User.belongsToMany(models.Company, {
      as: 'clients',
      through: UserClient,
      foreignKey: 'userId',
      otherKey: 'clientId',
    });
    models.Company.belongsToMany(models.User, {
      as: 'users',
      through: UserClient,
      foreignKey: 'clientId',
      otherKey: 'userId',
    });
  };

  return UserClient;
};