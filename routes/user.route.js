const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');
const {
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors,
} = require('../validations/user.validation'); // Import user validations

// Create a new user
router.post(
  '/create',
  validateUserRegistration,
  handleValidationErrors,
  UserController.createUser
);

// Update a user by ID
router.put('/:id', UserController.updateUser);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Delete a user by ID
router.delete('/:id', UserController.deleteUser);

// Protected route (requires authentication)
router.get('/protected', jwtAuthMiddleware, (req, res) => {
  // Access the authenticated user using req.user
  const authenticatedUser = req.user;
  res.json({ message: 'Access granted', user: authenticatedUser });
});

module.exports = router;
