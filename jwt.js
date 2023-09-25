const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config'); // Import your JWT secret from the config file

// Generate a JWT token for a user
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    // Add other user data you want to include in the token payload
  };

  const options = {
    expiresIn: '1h', // Set the expiration time as needed
  };

  return jwt.sign(payload, jwtSecret, options);
}

// Verify a JWT token
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
