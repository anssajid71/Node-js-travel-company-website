'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
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
    updated_at: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};