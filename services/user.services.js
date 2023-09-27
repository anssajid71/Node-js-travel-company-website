const { sequelize } = require('../database/database');
const getUsers = async (req) => {
  try {
    // Extract user role and other request parameters
    const userRole = req.user.role;
    const { searchQuery, page_no, limit, entity_id, tabKey } = req.body;

    // Define fields to search in
    const fields = ['fullname', 'email', 'role'];

    // Initialize role conditions and values
    let roleConditions = {};
    let roleValues = [];
    let entities = [{ entities: entity_id }];

    // Check user roles and set role conditions and values accordingly
    if (['SUPER_ADMIN', 'ADMIN', 'SUB_ADMIN'].includes(userRole)) {
      if (tabKey === 'subAdmins') {
        roleValues = ['SUB_ADMIN'];
      } else if (tabKey === 'agents') {
        roleValues = ['AGENT'];
      } else if (tabKey === 'users') {
        roleValues = ['USER'];
        entities.push({ entity: entity_id, role: 'USER' });
      } else {
        roleValues = ['SUB_ADMIN', 'AGENT', 'USER'];
        entities.push({ entity: entity_id, role: 'USER' });
      }
    }

    if (roleValues.length) {
      roleConditions = {
        role: roleValues,
      };
    }

    let queryCondition;

    // Create the query conditions based on searchQuery
    if (searchQuery) {
      queryCondition = {
        id: { [sequelize.Op.ne]: req.user.id },
        ...roleConditions,
        [sequelize.Op.and]: [
          {
            [sequelize.Op.or]: entities,
          },
          {
            [sequelize.Op.or]: fields.map((field) => ({
              [field]: { [sequelize.Op.iLike]: `%${searchQuery}%` },
            })),
          },
        ],
      };
    } else {
      queryCondition = {
        id: { [sequelize.Op.ne]: req.user.id },
        ...roleConditions,
        [sequelize.Op.or]: entities,
      };
    }

    // Get the page and limit from the body parameters
    const page = page_no || 1;
    const itemsPerPage = limit || 10;
    const offset = (page - 1) * itemsPerPage;

    // Fetch users based on query conditions
    const users = await User.findAndCountAll({
      where: queryCondition,
      offset: offset,
      limit: itemsPerPage,
      attributes: {
        exclude: [
          'password',
          'passwordResetCode',
          'tokens',
          'code',
          'expired',
          'image',
          'language',
          'logged_in',
          'logged_out',
          'total_chats_assigned',
          'updatedAt',
        ],
      },
      order: [['updatedAt', 'DESC']],
    });

    const totalItems = users.count;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return { users: users.rows, totalPages };
  } catch (error) {
    throw error;
  }
};

// Define a function to update user status
const updateStatus = async (userId, status) => {
  try {
    // Find the user by userId and update the status
    const user = await User.findByPk(userId);

    if (user) {
      user.status = status;
      await user.save();

      // If the user role is "ADMIN," update the status of associated users as well
      if (user.role === 'ADMIN') {
        await User.update(
          { status: status },
          {
            where: {
              adminId: userId,
            },
          }
        );
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  updateStatus,
};
