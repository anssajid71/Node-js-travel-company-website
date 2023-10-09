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
      //type: DataTypes.ENUM,
      type: {
        type: DataTypes.ENUM,
        values: ['flight', 'hotel', 'car_rental'],
        allowNull: false,
      },
      total_number_of_persons: DataTypes.INTEGER,
      pickup_location: DataTypes.STRING,
      total_cost: DataTypes.DECIMAL,
      //status: DataTypes.ENUM,
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'confirmed', 'canceled'],
        // allowNull: false,
      },

      payment_method: DataTypes.STRING,
      //payment_status: DataTypes.ENUM,
      pymment_status: {
        type: DataTypes.ENUM,
        values: ['pending', 'completed', 'failed'],
        // allowNull: false,
      },

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
