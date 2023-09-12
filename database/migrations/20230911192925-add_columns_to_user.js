'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'validationToken',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Users',
      'validated',
      {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );


    return Promise.resolve();
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Users',
      'validationToken'
    );

    await queryInterface.removeColumn(
      'Users',
      'validated'
    );


    return Promise.resolve();
  }
};
