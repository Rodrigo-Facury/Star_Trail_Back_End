'use strict';

module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'companyId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id'
        },
      },
    );
  },

  down: async function(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Users',
      'companyId'
    );
  }
};
