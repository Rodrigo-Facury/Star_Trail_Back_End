const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    clientUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    companyId: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    tableName: 'Users'
  });

  User.associate = (models) => {
    User.hasOne(models.Log,
      { foreignKey: 'userId', as: 'logs' });
  };

  User.associate = (models) => {
    User.belongsTo(models.Company,
      { foreignKey: 'companyId', as: 'company' });
  };

  return User;
};

module.exports = User;
