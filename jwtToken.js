const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../middlewares/env');

// Generate a JWT token for a user
function generateToken(user) {
  const payload = {
    id: 123,
    email: anysample,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, jwtSecret, options);
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
