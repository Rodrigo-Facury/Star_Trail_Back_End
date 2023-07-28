'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('WhistleBlows', 'whistleBlowersCompany', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('WhistleBlows', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('WhistleBlows', 'channel', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'web'
    });

    await queryInterface.removeColumn('WhistleBlows', 'visibility');

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('WhistleBlows', 'visibility', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    });

    await queryInterface.removeColumn('WhistleBlows', 'whistleBlowersCompany');
    await queryInterface.removeColumn('WhistleBlows', 'email');
    await queryInterface.removeColumn('WhistleBlows', 'channel');

    return Promise.resolve();
  }
};