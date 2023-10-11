'use strict';
const { Model } = require('sequelize');
const Services = require('../models');
module.exports = {
  Services,
  // Add your other models here
};

module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.associate = (models) => {
        Services.hasMany(models.Packages, {
          foreignKey: 'package_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'packages',
        });
      };
    }
  }
  Services.init(
    {
      package_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      service_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Services',
    }
  );
  return Services;
};
