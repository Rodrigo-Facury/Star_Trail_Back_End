module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WebsiteModules', [
      {
        name: 'Cadastro'
      },
      {
        name: 'Relatório'
      },
      {
        name: 'Canal de Denúncia'
      },
      {
        name: 'Comercial'
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WebsiteModules', null, {});
  }
};