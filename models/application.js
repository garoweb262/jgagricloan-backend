'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Application.init({
    fullname: DataTypes.STRING,
    psn: DataTypes.STRING,
    gradeLevel: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    nin: DataTypes.STRING,
    bvn: DataTypes.STRING,
    bank: DataTypes.STRING,
    accountNo: DataTypes.STRING,
    mda: DataTypes.STRING,
    gender: DataTypes.STRING,
   appointmentType: DataTypes.STRING,
    cropType: DataTypes.STRING,
    lga: DataTypes.STRING,
    farmLoc: DataTypes.STRING,
    farmLga: DataTypes.STRING,
    farmWard: DataTypes.STRING,
    community: DataTypes.STRING,
    cordinate: DataTypes.STRING,
    consent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};