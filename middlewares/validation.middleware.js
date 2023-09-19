const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  // If there are validation errors, send a 400 Bad Request response with the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If there are no validation errors, continue to the next middleware or route handler
  next();
};

module.exports = validationMiddleware;
