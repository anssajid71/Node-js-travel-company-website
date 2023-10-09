const { Client } = require('pg');

const dbConfig = {
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  host: 'localhost',
  port: 5432,
};

const client = new Client(dbConfig);

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the PostgreSQL database', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

module.exports = client;
