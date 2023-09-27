'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.associate = (models) => {
        User.hasMany(models.Packages, {
          foreignKey: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'users',
        });

        User.hasOne(models.Companies, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'companies',
        });

        User.hasMany(models.Booking, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          targetKey: 'id',
          as: 'booking',
        });
      };
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone_number: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      retype_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isRetypePasswordMatch(value) {
            if (value !== this.password) {
              throw new Error('Retyped password does not match');
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false, // Role is required
        validate: {
          isIn: {
            args: [['admin', 'user']], // Define the allowed values for 'role'
            msg: 'Invalid role', // Error message for validation failure
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
