const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { UserService } = require('../services/index');
const { generateToken } = require('../config/generatetoken');

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

    res
      .status(201)
      .json({ message: 'User created successfully', token, newUser });
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
};
