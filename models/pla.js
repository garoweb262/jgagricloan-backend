'use strict';
const { Model } = require('sequelize');
import Sequelize from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Pla extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Pla.init({
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plaNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        portfolio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cropType: {
            type: DataTypes.STRING,
            defaultValue: "Rice",
            allowNull: false
        },
        farmSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        farmLga: {
            type: DataTypes.STRING,
            allowNull: false
        },
        disbursement: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        issueDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('NOW()')
        }
    }, {
        sequelize,
        modelName: 'Pla',
    });
    return Pla;
};
