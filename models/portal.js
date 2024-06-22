'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Portal.init({
    open: DataTypes.STRING,
    openTime: DataTypes.STRING,
    closeTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Portal',
  });
  return Portal;
};