const Sequelize = require('sequelize');

const sequelize = new Sequelize('muhammadanassajid', 'newuser', 'password', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
