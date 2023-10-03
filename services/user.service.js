const { ROLE } = require('../constants/index');
const User = require('../models/User.model');

// Function to get users based on search criteria
const getUsers = async (req) => {
  try {
    const userRole = req.user.role;
    const { searchQuery, page_no, limit, entity_id, tabKey } = req.body;
    const fields = ['fullname', 'email', 'phone_number', 'password', 'role'];
    let roleConditions = {};
    let roleValues = [];
    let entities = [{ entities: { $in: [ObjectId(entity_id)] } }];

    if (['SUPER_ADMIN', 'ADMIN', 'SUB_ADMIN'].includes(userRole)) {
      if (tabKey === 'subAdmins') {
        roleValues = [ROLE.SUB_ADMIN];
      } else if (tabKey === 'agents') {
        roleValues = [ROLE.AGENT];
      } else if (tabKey === 'users') {
        roleValues = [ROLE.USER];
        entities.push({ entity: entity_id, role: ROLE.USER });
      } else {
        roleValues = [ROLE.SUB_ADMIN, ROLE.AGENT, ROLE.USER];
        entities.push({ entity: entity_id, role: ROLE.USER });
      }
    }

    if (roleValues.length) {
      roleConditions = {
        role: {
          $in: roleValues,
        },
      };
    }

    let queryCondition;
    if (searchQuery) {
      queryCondition = {
        _id: { $ne: req.user._id },
        ...roleConditions,
        $and: [
          {
            $or: entities,
          },
          {
            $or: fields.map((field) => ({
              [field]: { $regex: `.*${searchQuery}.*`, $options: 'i' },
            })),
          },
        ],
      };
    } else {
      queryCondition = {
        _id: { $ne: req.user._id },
        ...roleConditions,
        $or: entities,
      };
    }

    // Get the page and limit from the body parameters
    const page = page_no || 1;
    const itemsPerPage = limit || 10;
    const skip = (page - 1) * itemsPerPage;

    const totalItems = await User.countDocuments(queryCondition);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const users = await User.find(queryCondition)
      .skip(skip)
      .limit(itemsPerPage)
      .select(
        '-password -passwordResetCode -tokens -__v -code -expired -image -language -logged_in -logged_out -total_chats_assigned -updatedAt'
      )
      .populate('entities')
      .sort({ updatedAt: -1 });

    return { users, totalPages };
  } catch (error) {
    throw error;
  }
};

// Function to update user status
const updateStatus = async (userId, status) => {
  try {
    let user = await User.findOne({ _id: userId });
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          status: status,
        },
      }
    );
    if (user.role === 'ADMIN') {
      await User.updateMany(
        { admin: user._id },
        {
          $set: {
            status: status,
          },
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

// Function to create a new user
const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};

// Function to update a user by ID
const updateUser = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user by ID
const deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
};

// Function to get a user by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  updateStatus,

  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
