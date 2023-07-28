'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      corporateName: {
        type: Sequelize.STRING
      },
      cnpj: {
        type: Sequelize.STRING
      },
      commercialPhoneNumber: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      priorDiligence: {
        type: Sequelize.BOOLEAN
      },
      complianceRisk: {
        type: Sequelize.STRING
      },
      scopeSummary: {
        type: Sequelize.STRING
      },
      companyLogoUrl: {
        type: Sequelize.STRING
      },
      implementationTimelineUrl: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      economicActivityCodes: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Companies');
  }
};
