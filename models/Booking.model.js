'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.associate = (models) => {
        Booking.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'user',
        });
        Booking.belongsTo(models.Packages, {
          foreignKey: 'package_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'packages',
        });
      };
    }
  }
  Booking.init(
    {
      user_id: DataTypes.INTEGER,
      package_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      type: DataTypes.ENUM,
      total_number_of_persons: DataTypes.INTEGER,
      pickup_location: DataTypes.STRING,
      total_cost: DataTypes.DECIMAL,
      status: DataTypes.ENUM,
      payment_method: DataTypes.STRING,
      payment_status: DataTypes.ENUM,
      payment_date: DataTypes.STRING,
      created_at: DataTypes.STRING,
      updated_at: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );
  return Booking;
};
