const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/generatetoken');

// const signInUser = async (email, password) => {
//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       throw new Error('User not found.');
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       throw new Error('Incorrect password.');
//     }

//     const token = generateToken(user);
//     return { user, token };
//   } catch (error) {
//     throw error;
//   }
// }


const createUser = async (userData) => {
  try {
//     const saltRounds = 10; 
// const hashedPassword = await bcrypt.hash(userData.Password, saltRounds);
// userData.Password = hashedPassword;

    return await User.create(userData);
  } catch (error) {
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

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ where: { email } });
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
  // signInUser,
  findUserByEmail
};