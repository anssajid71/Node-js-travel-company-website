const { check, validationResult } = require('express-validator');

const validatePackageCreation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validatePackageCreation,
  handleValidationErrors,
};
