'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Staffs', {
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
      ipps_id: {
        type: Sequelize.STRING
      },
      mda: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      accountNo: {
        type: Sequelize.STRING
      },
      bvn: {
        type: Sequelize.STRING
      },
      gradeLevel: {
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
    await queryInterface.dropTable('Staffs');
  }
};