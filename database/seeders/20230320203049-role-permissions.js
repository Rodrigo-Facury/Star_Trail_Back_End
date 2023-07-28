module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RolePermissions', [
      {
        moduleId: 1,
        roleId: 3
      },
      {
        moduleId: 2,
        roleId: 3
      },
      {
        moduleId: 3,
        roleId: 3
      },
      {
        moduleId: 4,
        roleId: 3
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RolePermissions', null, {});
  }
};