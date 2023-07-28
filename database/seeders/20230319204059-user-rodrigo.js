const bcrypt = require('bcrypt');
const password = process.env.MY_PASSWORD;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return queryInterface.bulkInsert('Users', [
      {
        name: 'Rodrigo Facury',
        email: 'rodrigo.facury14@gmail.com',
        password: hash,
        phoneNumber: '99999999991',
        type: 'rw',
        status: 'Ativo',
        clientUser: false,
        companyId: 1
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};