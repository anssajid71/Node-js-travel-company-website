const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../middlewares/env');

// Generate a JWT token for a user with expiration time
function generateToken(user) {
  const payload = {
    id: 123,
    email: user.email,
  };

  const options = {
    expiresIn: '1h', // Set the expiration time to 1 hour
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
