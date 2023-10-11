const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { Packages } = require('../models');

const validateSignUpRequest = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email')
  .notEmpty()
  .withMessage('Email is required (info@gmail.com)')
  .isEmail()
  .withMessage('Valid email is required (e.g., info@gmail.com)')
  .custom(async (value) => {
    const existingPackage = await Packages.findOne({ where: { email: value } });
    if (existingPackage) {
      throw new Error('Email is already in use');
    }
    return true;
  }),
  check('price')
    .isLength({ min: 1 })
    .withMessage('Price must be at least 1 character long'),
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
