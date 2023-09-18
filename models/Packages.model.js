'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Packages.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      total_days: DataTypes.INTEGER,
      type: DataTypes.STRING,
      images: DataTypes.ARRAY,
      available_seats: DataTypes.INTEGER,
      location: DataTypes.STRING,
      created_at: DataTypes.STRING,
      updated_at: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Packages',
    }
  );
  return Packages;
};
