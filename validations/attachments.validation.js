const { check, validationResult } = require('express-validator');

// Validation for creating a new attachment
const validateAttachmentCreation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('attachment_id').notEmpty().withMessage('id is required'),
];

const validateAttachmentUpdate = [];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
};

module.exports = {
  validateAttachmentCreation,
  validateAttachmentUpdate,
  handleValidationErrors,
};
