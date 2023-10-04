'use strict';
const { Model } = require('sequelize');
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
      package_id: DataTypes.INTEGER,
      service_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Services',
    }
  );
  return Services;
};
