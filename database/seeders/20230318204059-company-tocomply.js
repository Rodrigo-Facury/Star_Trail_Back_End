module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [
      {
        corporateName: 'ToComply Soluções Tecnológicas LTDA',
        cnpj: '37.197.614/0001-15',
        email: 'compliance@tocomply.com.br',
        status: 'client'
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};