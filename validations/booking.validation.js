const { check, validationResult } = require('express-validator');

const validateBookingCreation = [
  check('user_id').notEmpty().withMessage('User ID is required'),
  check('package_id').notEmpty().withMessage('is required'),
  check('type').notEmpty().withMessage('is required'),
  check('total_number_of_persons').notEmpty().withMessage('is required'),
  check('pickup_location').notEmpty().withMessage('is required'),
  check('payment_method').notEmpty().withMessage('is required'),
];

const validateBookingUpdate = [
  check('user_id').notEmpty().withMessage('User ID is required'),
  check('package_id').notEmpty().withMessage('is required'),
  check('type').notEmpty().withMessage('is required'),
  check('total_number_of_persons').notEmpty().withMessage('is required'),
  check('pickup_location').notEmpty().withMessage('is required'),
  check('payment_method').notEmpty().withMessage('is required'),
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
