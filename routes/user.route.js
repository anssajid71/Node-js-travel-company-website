const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth');
const { createUser } = require('../controllers/user.controller');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const { User } = require('../models/User.model');
router.post('/create', createUser);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);

router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/protected', jwtAuthMiddleware, (req, res) => {
  // Access the authenticated user using req.user
  const authenticatedUser = req.user;
  res.json({ message: 'Access granted', user: authenticatedUser });
});

module.exports = router;
