const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../middlewares/env');

const jwtAuthMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (header) {
    const token = header.split(' ')[1]; // Bearer token_value

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded; // Store the decoded user data in the request object
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid Token' });
    }
  } else {
    return res.status(401).json({ error: 'No Token Provided' });
  }
};

module.exports = jwtAuthMiddleware;
