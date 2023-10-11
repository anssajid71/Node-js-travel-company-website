const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');

const validateSignUpRequest = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Valid Email required')
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error('Email is already in use');
      }
      return true;
    }),
  check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateSignIpRequest = [
  check('email')
    .isEmail()
    .withMessage('Valid Email required')
    .custom(async (value) => {
      const existingUser = await User.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error('Email is already in use');
      }
      return true;
    }),
  check('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 6 characters long'),
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
  validateSignIpRequest,
};
