require('dotenv').config();

const jwtSecret = process.env.REACT_APP_JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;

module.exports = {
  jwtSecret,
  jwtExpiration,
};
