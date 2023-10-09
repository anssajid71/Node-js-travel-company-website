require('dotenv').config();

const jwtSecret = process.env.REACT_APP_JWT_SECRET;
const jwtExpiration = '1h';

module.exports = {
  jwtSecret,
  jwtExpiration,
};
