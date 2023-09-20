const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const UserMiddleware = require('../middlewares/user.middleware').default;

router.post('/', UserMiddleware.validateUserData, UserController.createUser);
router.put('/:id', UserMiddleware.validateUserData, UserController.updateUser);

router.get('/', User.UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
