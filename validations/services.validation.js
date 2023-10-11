const { check, validationResult } = require('express-validator');
const { Services } = require('../models');

const createServiceValidation = [
  check('name').notEmpty().withMessage('Service name is required'),
  check('description').notEmpty().withMessage('Service description is required'),
  check('package_id')
    .isNumeric()
    .withMessage('Package id must be a numeric value')
    .custom(async (value) => {
      const existingService = await Services.findOne({ where: { package_id: value } });
      if (existingService) {
        throw new Error('Package id is already in use');
      }
      return true;
    }),
];

const updateServiceValidation = [
  check('name').notEmpty().withMessage('Service name is required'),
  check('description').notEmpty().withMessage('Service description is required'),
  check('package_id')
    .isNumeric()
    .withMessage('Package id must be a numeric value')
    .custom(async (value) => {
      const existingService = await Services.findOne({ where: { package_id: value } });
      if (existingService) {
        throw new Error('Package id is already in use');
      }
      return true;
    }),
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
