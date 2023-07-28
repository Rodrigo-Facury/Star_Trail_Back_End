'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'WhistleBlows',
      'secretKey'
    );

    await queryInterface.addColumn(
      'WhistleBlows',
      'key',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'WhistleBlows',
      'whistleBlowersName',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'WhistleBlows',
      'phoneNumber',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'WhistleBlows',
      'documentsDirectory',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'WhistleBlows',
      'status',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'WhistleBlows',
      'visibility',
      {
        type: Sequelize.BOOLEAN
      }
    );


    return Promise.resolve();
  },

  down: async function(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'WhistleBlows',
      'secretKey',
      {
        type: Sequelize.STRING
      },
    );

    await queryInterface.removeColumn(
      'WhistleBlows',
      'key'
    );

    await queryInterface.removeColumn(
      'WhistleBlows',
      'whistleBlowersName'
    );

    await queryInterface.removeColumn(
      'WhistleBlows',
      'phoneNumber'
    );

    await queryInterface.removeColumn(
      'WhistleBlows',
      'documentsDirectory'
    );

    await queryInterface.removeColumn(
      'WhistleBlows',
      'status'
    );

    await queryInterface.removeColumn(
      'WhistleBlows',
      'visibility'
    );

    return Promise.resolve();

  }
};
