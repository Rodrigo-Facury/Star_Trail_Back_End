'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Companies',
      'address'
    );

    await queryInterface.addColumn(
      'Companies',
      'zipCode',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Companies',
      'street',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Companies',
      'streetNumber',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Companies',
      'complement',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Companies',
      'neighborhood',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Companies',
      'city',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Companies',
      'state',
      {
        type: Sequelize.STRING
      }
    );

    return Promise.resolve();
  },

  down: async function(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Companies',
      'address',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.removeColumn(
      'Companies',
      'zipCode'
    );

    await queryInterface.removeColumn(
      'Companies',
      'street'
    );

    await queryInterface.removeColumn(
      'Companies',
      'streetNumber'
    );

    await queryInterface.removeColumn(
      'Companies',
      'complement'
    );

    await queryInterface.removeColumn(
      'Companies',
      'neighborhood'
    );

    await queryInterface.removeColumn(
      'Companies',
      'city'
    );

    await queryInterface.removeColumn(
      'Companies',
      'state'
    );

    return Promise.resolve();

  }
};
