module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'Adm'
      },
      {
        name: 'Sales'
      },
      {
        name: 'IT'
      },
      {
        name: 'Compliance Officer'
      },
      {
        name: 'Master'
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};