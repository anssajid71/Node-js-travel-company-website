const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require('../controllers/user.controller');
const {
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors,
} = require('../validations/user.validation');

router.post(
  '/',
  // validateUserLogin,
  // validateUserRegistration,
  // handleValidationErrors,
  // jwtAuthMiddleware,
  createUser
);

router.put('/:id', jwtAuthMiddleware, updateUser);

router.get('/:id', jwtAuthMiddleware, getUserById);

router.delete('/:id', jwtAuthMiddleware, deleteUser);

module.exports = router;
