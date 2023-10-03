const { Client } = require('pg');

const dbConfig = {
  user: 'newUser',
  password: 'password',
  database: 'muhammadans',
  host: 'localhost',
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
