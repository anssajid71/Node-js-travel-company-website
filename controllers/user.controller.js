const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { UserService } = require('../services/index');
const { generateToken } = require('../config/generatetoken');
const { jwtExpiration } = require('../middlewares/env');
const bcrypt = require('bcrypt');

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.findUserByEmail(email);

    if (!user) {
      return res.status(ERROR_CODES.BAD_REQUEST).json({
        error: true,
        message: 'User not found. Please sign up first.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(ERROR_CODES.BAD_REQUEST).json({
        error: true,
        message: 'Incorrect password.',
      });
    }

    const token = generateToken(user);

    res.status(201).json({
      message: 'User SignIn successfully',
      token,
      expires_in: jwtExpiration,
      UserDetails: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
}
const getAllUser = async (req, res) => {
  try {
    const newUser = await UserService.getAllUser();
    res.status(201).json({ message: 'Get all user successfully', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User SignUp successfully',
      token,
      expires_in: jwtExpiration,
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserService.updateUser(id, req.body);

    res.status(SUCCESS_CODE).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);

    res.status(SUCCESS_CODE).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    res.status(SUCCESS_CODE).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(ERROR_CODES.BAD_REQUEST)
      .json({ error: true, message: error.toString() });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
  signInUser,
};