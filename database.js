const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // Change to your PostgreSQL host
  port: 5432, // Change to your PostgreSQL port
  username: 'your_username', // Change to your PostgreSQL username
  password: 'your_password', // Change to your PostgreSQL password
  database: 'your_database', // Change to your PostgreSQL database name
});

module.exports = sequelize;
