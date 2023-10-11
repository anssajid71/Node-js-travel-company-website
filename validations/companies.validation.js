const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { Companies } = require('../models');

const validateSignUpRequest = [
  check('name').notEmpty().withMessage('Name is required'),
  check('user_id')
  .isNumeric()
  .withMessage('User id must be a numeric value')
  .custom(async (value) => {
    const existingCompanies = await Companies.findOne({ where: { user_id: value } });
    if (existingCompanies) {
      throw new Error('User id is already in use');
    }
    return true;
  }),  
  check('phone_number').notEmpty().withMessage('Phone Number is required'),
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
