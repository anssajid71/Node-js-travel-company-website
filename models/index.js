const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    // eslint-disable-next-line comma-dangle
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      // eslint-disable-next-line implicit-arrow-linebreak, operator-linebreak
      file.indexOf('.') !== 0 &&
      // eslint-disable-next-line operator-linebreak
      file !== basename &&
      // eslint-disable-next-line operator-linebreak
      file.slice(-3) === '.js' &&
      // eslint-disable-next-line comma-dangle
      file.indexOf('.test.js') === -1
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      // eslint-disable-next-line comma-dangle
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
