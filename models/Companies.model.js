'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    static associate(models) {
      Companies.associate = (models) => {
        Companies.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'user',
        });
      };
    }
  }
  Companies.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      phone_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Companies',
    }
  );
  return Companies;
};
