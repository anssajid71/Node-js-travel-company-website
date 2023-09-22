const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { createUser } = require('../controllers/user.controller');

const { User } = require('../models/User.model');
router.post('/create', createUser);
router.get('/profile', verifyToken, UserController.getUserProfile);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);

router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
