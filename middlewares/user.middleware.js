const { ERROR_CODES, ERROR_MESSAGES } = require('../constants'); // Adjust the path to match your project structure
const jwt = require('jsonwebtoken');

// Middleware to validate user data for create and update routes
const validateUserData = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.INVALID_ARGUMENTS,
    });
  }

  // You can add more validation logic here as needed

  next();
};

// Middleware to verify JWT token for protected routes
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(ERROR_CODES.UNAUTHORIZED).json({
      error: true,
      message: 'Token is missing',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret

    // Attach user information to the request for further processing
    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(ERROR_CODES.UNAUTHORIZED).json({
      error: true,
      message: 'Invalid token',
    });
  }
};

module.exports = {
  validateUserData,
  verifyToken,
};
