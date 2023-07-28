'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'clientUser',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    );
  },

  down: async function(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Users',
      'clientUser'
    );
  }
};
