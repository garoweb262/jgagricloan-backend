'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING
      },
      psn: {
        type: Sequelize.STRING
      },
      gradeLevel: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      nin: {
        type: Sequelize.STRING
      },
      bvn: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      accountNo: {
        type: Sequelize.STRING
      },
      mda: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      appointmentType: {
        type: Sequelize.STRING
      },
      cropType: {
        type: Sequelize.STRING
      },
      lga: {
        type: Sequelize.STRING
      },
      farmLoc: {
        type: Sequelize.STRING
      },
      farmLga: {
        type: Sequelize.STRING
      },
      farmWard: {
        type: Sequelize.STRING
      },
      community: {
        type: Sequelize.STRING
      },
      cordinate: {
        type: Sequelize.STRING
      },
      consent: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Applications');
  }
};