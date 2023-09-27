const { check, validationResult } = require('express-validator');

const validateCompanyCreation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('user_id').notEmpty().withMessage('User ID is required'),
  check('phone_number').notEmpty().withMessage('Phone Number is required'),
];

const validateCompanyUpdate = [
  check('name').notEmpty().withMessage('Name is required'),
  check('user_id').notEmpty().withMessage('user-id is required'),
  check('phone_number').notEmpty().withMessage('is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
};

module.exports = {
  validateCompanyCreation,
  validateCompanyUpdate,
  handleValidationErrors,
};
