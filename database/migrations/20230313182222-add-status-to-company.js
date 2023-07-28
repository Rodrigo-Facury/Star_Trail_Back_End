'use strict';

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Companies',
      'status',
      {
        type: Sequelize.STRING
      }
    );
  },

  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Companies',
      'status',
    );
  }
};
