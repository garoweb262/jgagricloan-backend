'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Approveds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      psn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mda: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bank: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bvn: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gradeLevel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cropType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lgaOrigin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      farmLga: {
        type: Sequelize.STRING,
        allowNull: false
      },
      farmLocation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      disbursement: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      issueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Approveds');
  }
};
