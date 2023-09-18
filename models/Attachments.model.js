'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachments extends Model {
    static associate(models) {
      Attachments.hasMany(models.Hotels, {
        foreignKey: 'attachment_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        targetKey: 'id',
        as: 'hotels',
      });
      Attachments.belongsTo(models.packages, {
        foreignKey: 'attachment_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        targetKey: 'id',
        as: 'packages',
      });
    }
  }
  Attachments.init(
    {
      attachment_id: DataTypes.INTEGER,
      attachment_type: DataTypes.STRING,
      attachment_url: DataTypes.STRING,
      created_at: DataTypes.STRING,
      updated_at: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Attachments',
    }
  );
  return Attachments;
};
