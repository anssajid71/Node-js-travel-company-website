// packages.validation.js
const { check, validationResult } = require('express-validator');

const validatePackageCreation = [
  check('name').notEmpty().withMessage('Package name is required'),
  check('description')
    .notEmpty()
    .withMessage('Package description is required'),
  check('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a number greater than 0.00'),
];

const validatePackageUpdate = [
  check('name').notEmpty().withMessage('Package name is required'),
  check('description')
    .notEmpty()
    .withMessage('Package description is required'),
  check('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a number greater than 0.00'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
};

module.exports = {
  validatePackageCreation,
  validatePackageUpdate,
  handleValidationErrors,
};
