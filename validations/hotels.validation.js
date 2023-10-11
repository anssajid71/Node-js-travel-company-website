const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validateSignUpRequest = [
  check('hotel_name').notEmpty().withMessage('Name is required'),
  check('location').notEmpty().withMessage('Location is required'),
  check('description').notEmpty().withMessage('Description is required'),
  check('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
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
