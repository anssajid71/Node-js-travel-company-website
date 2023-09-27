const { check, validationResult } = require('express-validator');

const validateHotelCreation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('location').notEmpty().withMessage('Location is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
];

const validateHotelUpdate = [
  check('name').notEmpty().withMessage('Name is required'),
  check('location').notEmpty().withMessage('Location is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
};

module.exports = {
  validateHotelCreation,
  validateHotelUpdate,
  handleValidationErrors,
};
