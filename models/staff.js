'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Staff.init({
    fullname: DataTypes.STRING,
    psn: DataTypes.STRING,
    ipps_id: DataTypes.STRING,
    mda: DataTypes.STRING,
    bank: DataTypes.STRING,
    accountNo: DataTypes.STRING,
    bvn: DataTypes.STRING,
    gradeLevel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};