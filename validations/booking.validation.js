const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validateSignUpRequest = [
  check('user_id').notEmpty().withMessage('User ID is required'),
  check('package_id').notEmpty().withMessage('package id is required'),
  check('type').notEmpty().withMessage('type is required'),
  check('total_number_of_persons')
    .notEmpty()
    .withMessage('Total number of persons is required'),
  check('pickup location'),
  check('payment_method').notEmpty().withMessage('payment method is required'),
];


const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: errors.array()[0].msg });
  }
  next();
};

module.exports = {
  validateSignUpRequest,
  isRequestValidated,
};
