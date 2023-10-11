const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
  signInUser,
} = require('../controllers/user.controller');
const {
  validateSignUpRequest,
  validateSignIpRequest,
  isRequestValidated,
} = require('../validations/auth');

router.post('/signin', validateSignIpRequest, isRequestValidated, signInUser);

router.post('/signup', validateSignUpRequest, isRequestValidated, createUser);

router.get('/getall', jwtAuthMiddleware, getAllUser);

router.put('/:id', jwtAuthMiddleware, updateUser);

router.get('/:id', jwtAuthMiddleware, getUserById);

router.delete('/:id', jwtAuthMiddleware, deleteUser);

module.exports = router;
