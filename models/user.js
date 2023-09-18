import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {}
  }
  User.init(
    {
    id: DataTypes.INTEGER,
  },
    {
      Name: DataTypes.STRING,
    },
    {
      Email: DataTypes.STRING,
    },
    {
      Password: DataTypes.STRING,
    },
    {
      RetypePasword: DataTypes.STRING,
    },
    {
      UserType: DataTypes.ENUM,
    },{
      sequelize,
      modelName: 'User',
    });
    
    module.exports = User;