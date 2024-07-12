'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Approved extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Approved.init({
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        psn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mda: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accountNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bvn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gradeLevel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cropType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lgaOrigin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        farmLga: {
            type: DataTypes.STRING,
            allowNull: false
        },
        farmLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        disbursement: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        issueDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Approved',
    });
    return Approved;
};
