const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
} = require('../controllers/user.controller');
const {
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors,
} = require('../validations/user.validation');

router.post(
  '/',

  createUser
);

router.get('/getall', jwtAuthMiddleware, getAllUser);

router.put('/:id', jwtAuthMiddleware, updateUser);

router.get('/:id', jwtAuthMiddleware, getUserById);

router.delete('/:id', jwtAuthMiddleware, deleteUser);

module.exports = router;
