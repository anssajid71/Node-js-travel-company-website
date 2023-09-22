const { check, validationResult } = require('express-validator');

const createServiceValidation = [
  check('name').notEmpty().withMessage('Service name is required'),
  check('description')
    .notEmpty()
    .withMessage('Service description is required'),
  check('package_id').isNumeric().withMessage('package_id is required'),
];

const updateServiceValidation = [
  check('name').notEmpty().withMessage('Service name is required'),
  check('description')
    .notEmpty()
    .withMessage('Service description is required'),
  check('package_id').isNumeric().withMessage('package_id is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = {
  createServiceValidation,
  updateServiceValidation,
  handleValidationErrors,
};
