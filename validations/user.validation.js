// const { check, validationResult } = require('express-validator');

// const validateUserRegistration = [
//   check('name').notEmpty().withMessage('Name is required'),
//   check('email').isEmail().withMessage('Invalid email'),
//   check('password')
//     .isLength({ min: 8 })
//     .withMessage('Password must be at least 8 characters long'),
//   check('retype_pasword').custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error('Retyped password does not match');
//     }
//     return true;
//   }),
//   check('role')
//     .isIn(['admin', 'user'])
//     .withMessage('Invalid role, must be admin or user'),
// ];

// const validateUserLogin = [
//   check('email').isEmail().withMessage('Invalid email'),
//   check('password').notEmpty().withMessage('Password is required'),
// ];

// const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const errorMessages = errors.array().map((error) => error.msg);
//     return res.status(400).json({ errors: errorMessages });
//   }
// };

// module.exports = {
//   validateUserRegistration,
//   validateUserLogin,
//   handleValidationErrors,
// };
