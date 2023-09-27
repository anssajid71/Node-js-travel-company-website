const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = '1h';

module.exports = {
  jwtSecret,
  jwtExpiration,
};
