const { Client } = require('pg');
const pgp = require('pg-promise')();
const db = pgp('postgres');

const dbConfig = {
  user: 'newuser',
  password: 'password',
  database: 'postgres',
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
};

const client = new Client(dbConfig);

client
  .connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to the PostgreSQL database', err);
  });

module.exports = client;
