const { User } = require('../models/index');

const createUser = async (userData) => {
  try {
    return await User.create(userData);
    // return newUser;
  } catch (error) {
    // console.log('erooro->', error);
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const [rowsUpdated] = await User.update(userData, {
      where: { id: userId },
    });

    if (rowsUpdated === 0) {
      throw new Error('User not found or no updates were made.');
    }

    const updatedUser = await User.findByPk(userId);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const rowsDeleted = await User.destroy({
      where: { id: userId },
    });

    if (rowsDeleted === 0) {
      throw new Error('User not found or no deletions were made.');
    }
  } catch (error) {
    throw error;
  }
};
const getUserById = async (userId) => {
  try {
    console.log('userId', userId);
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUser = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUser,
};
