'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Logs', 'action', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('Logs', 'clientId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Companies',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Logs', 'details', {
      type: Sequelize.TEXT
    });

    await queryInterface.addColumn('Logs', 'table', {
      type: Sequelize.STRING
    });

    await queryInterface.removeColumn('Logs', 'log');

    return Promise.resolve();
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Logs', 'log', {
      type: Sequelize.STRING
    });

    await queryInterface.removeColumn('Logs', 'action');
    await queryInterface.removeColumn('Logs', 'clientId');
    await queryInterface.removeColumn('Logs', 'details');
    await queryInterface.removeColumn('Logs', 'table');

    return Promise.resolve();
  }
};
