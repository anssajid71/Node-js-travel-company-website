const { SUCCESS_CODE, ERROR_CODES } = require('../constants');
const { UserService } = require('../services/index');

const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);

    const token = generateToken(newUser);

    res.status(201).json({ message: 'User created successfully', token });
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

const index = async (req, res) => {
  try {
    const { users, totalPages } = await UserService.getUsers(req);

    return res.status(SUCCESS_CODE).json({
      users,
      totalPages,
    });
  } catch (error) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      error: true,
      message: error.toString(),
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await UserService.updateStatus(id, status);

    const { searchQuery, page_no, limit } = req.body;
    const currentUserId = req.user._id;

    const { users, totalPages } = await UserService.getPaginatedUsers(
      searchQuery,
      page_no,
      limit,
      currentUserId
    );

    return res.status(SUCCESS_CODE).send({
      message: 'Status updated successfully!',
      users,
      totalPages,
    });
  } catch (error) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      error: true,
      message: error.toString(),
    });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  index,
  updateStatus,
};
