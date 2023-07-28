'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Users',
      'profile'
    );

    await queryInterface.removeColumn(
      'Users',
      'inCharge'
    );

    return Promise.resolve();
  },

  down: async function(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'profile',
      {
        type: Sequelize.STRING
      },
    );

    await queryInterface.addColumn(
      'Users',
      'inCharge',
      {
        type: Sequelize.BOOLEAN
      },
    );

    return Promise.resolve();

  }
};
