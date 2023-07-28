const WebsiteModule = (sequelize, DataTypes) => {
  const WebsiteModule = sequelize.define('WebsiteModule', {
    name: DataTypes.STRING
  }, {
    tableName: 'WebsiteModules'
  });

  return WebsiteModule;
};

module.exports = WebsiteModule;
