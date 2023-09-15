// eslint-disable-next-line import/no-extraneous-dependencies
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      // eslint-disable-next-line comma-dangle
    }
  );
  return User;
};
