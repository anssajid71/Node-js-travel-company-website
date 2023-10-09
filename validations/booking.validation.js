const { check, validationResult } = require('express-validator');

const validateBookingCreation = [
  check('user_id').notEmpty().withMessage('User ID is required'),
  check('package_id').notEmpty().withMessage('package id is required'),
  check('type').notEmpty().withMessage('type is required'),
  check('total_number_of_persons')
    .notEmpty()
    .withMessage('Total number of persons is required'),
  check('pickup location'),
    // .notEmpty()
    // .withMessage('pickup location is required'),
  check('payment_method').notEmpty().withMessage('payment method is required'),
];

const validateBookingUpdate = [
  check('user_id').notEmpty().withMessage('User ID is required'),
  check('package_id').notEmpty().withMessage('package_id is required'),
  check('type').notEmpty().withMessage('type is required'),
  check('total_number_of_persons')
    .notEmpty()
    .withMessage('total_number_of_persons is required'),
  check('pickup_location')
    .notEmpty()
    .withMessage('pickup_location is required'),
  check('payment_method').notEmpty().withMessage('payment_method is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
};

module.exports = {
  validateBookingCreation,
  validateBookingUpdate,
  handleValidationErrors,
};
