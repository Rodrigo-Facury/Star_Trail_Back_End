'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prospects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
        },
      },
      tradingName: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      followUpDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      negotiatingWith: {
        type: Sequelize.STRING
      },
      paymentDue: {
        type: Sequelize.INTEGER
      },
      implementationFee: {
        type: Sequelize.FLOAT
      },
      serviceFee: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prospects');
  }
};