'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Notifications',
      'seen',
      {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );

    await queryInterface.addColumn(
      'Notifications',
      'goto',
      {
        type: Sequelize.STRING
      }
    );


    return Promise.resolve();
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Notifications',
      'seen'
    );

    await queryInterface.removeColumn(
      'Notifications',
      'goto'
    );


    return Promise.resolve();
  }
};
