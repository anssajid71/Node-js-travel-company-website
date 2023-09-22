const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
