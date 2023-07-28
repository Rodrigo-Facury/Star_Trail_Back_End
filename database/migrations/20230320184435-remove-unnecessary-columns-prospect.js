'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Prospects',
      'contact'
    );

    await queryInterface.removeColumn(
      'Prospects',
      'email'
    );

    await queryInterface.addColumn(
      'Companies',
      'contact',
      {
        type: Sequelize.STRING
      },
    );
    
    await queryInterface.addColumn(
      'Companies',
      'email',
      {
        type: Sequelize.STRING
      },
    );

    return Promise.resolve();
  },

  down: async function(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Prospects',
      'contact',
      {
        type: Sequelize.STRING
      },
    );
    
    await queryInterface.addColumn(
      'Prospects',
      'email',
      {
        type: Sequelize.STRING
      },
    );

    await queryInterface.removeColumn(
      'Companies',
      'contact'
    );

    await queryInterface.removeColumn(
      'Companies',
      'email'
    );
    
    return Promise.resolve();

  }
};
