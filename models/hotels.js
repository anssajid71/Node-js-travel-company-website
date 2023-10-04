'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotels extends Model {
    static associate(models) {
      Hotels.associate = (models) => {
        Hotels.hasMany(models.Packages, {
          foreignKey: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'packages',
        });

        Hotels.belongsTo(models.Attachments, {
          foreignKey: 'attachment_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'attachments',
        });
      };
    }
  }
  Hotels.init(
    {
      hotel_name: DataTypes.STRING,
      location: DataTypes.STRING,
      images: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Hotels',
    }
  );
  return Hotels;
};
