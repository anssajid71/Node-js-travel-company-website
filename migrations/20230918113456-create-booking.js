'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      package_id: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.ENUM('Individual', 'Group'), // Define allowed values
        allowNull: false, // Adjust allowNull based on your requirements
        role: {
          type: DataTypes.ENUM('Client', 'Admin', 'Staff'), // Allowed ENUM values
          allowNull: false,
        },
      },
      total_number_of_persons: {
        type: Sequelize.INTEGER,
      },
      pickup_location: {
        type: Sequelize.STRING,
      },
      total_cost: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.ENUM('Individual', 'Group'),
        role: {
          type: DataTypes.ENUM('Client', 'Admin', 'Staff'),
          allowNull: false,
        },
      },
      payment_method: {
        type: Sequelize.STRING,
      },
      payment_status: {
        type: Sequelize.ENUM('Individual', 'Group'),
      },
      payment_date: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.STRING,
      },
      updated_at: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  },
};
