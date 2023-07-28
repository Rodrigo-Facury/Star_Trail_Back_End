'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WhistleBlowUpdates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      udDocumentsDirectory: {
        type: Sequelize.STRING,
        allowNull: true
      },
      udstatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      wbId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'WhistleBlows',
          key: 'id',
        },
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      urgency: {
        type: Sequelize.STRING,
        allowNull: true
      },
      severity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      validation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      areaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      wbAction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      opinion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tcReportsDirectory: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WhistleBlowUpdates');
  }
};