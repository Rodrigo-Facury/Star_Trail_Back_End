'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'reason',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Users',
      'isCompetitor',
      {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    );


    return Promise.resolve();
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Users',
      'reason'
    );

    await queryInterface.removeColumn(
      'Users',
      'isCompetitor'
    );


    return Promise.resolve();
  }
};
