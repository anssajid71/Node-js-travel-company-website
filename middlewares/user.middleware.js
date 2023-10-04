const { ERROR_CODES, ERROR_MESSAGES } = require('../../constants');
const User = require('../../models/User').User;

const deleteAdminValidation = async (req, res, next) => {
  let { adminEmail } = req.body;

  if (!adminEmail) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.INVALID_ARGUMENTS,
    });
  }

  try {
    let admin = await User.findOne({
      email: adminEmail,
      role: 'ADMIN',
    });

    if (admin != null) {
      req.admin = admin;
      next();
    } else {
      return res.status(ERROR_CODES.BAD_REQUEST).json({
        error: true,
        message:
          'Either adminEmail is invalid or you do not have permission to delete the admin!',
      });
    }
  } catch (e) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      error: true,
      message: e.toString(),
    });
  }
};

const deleteValidation = async (req, res, next) => {
  let { id } = req.body;

  if (!id) {
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      error: true,
      message: ERROR_MESSAGES.INVALID_ARGUMENTS,
    });
  }

  try {
    let admin = await User.findOne({
      _id: id,
      role: 'ADMIN',
    });

    if (admin != null) {
      req.admin = admin;
      next();
    } else {
      return res.status(ERROR_CODES.BAD_REQUEST).json({
        error: true,
        message:
          'Either the admin ID is invalid or you do not have permission to delete the admin!',
      });
    }
  } catch (e) {
    console.log('Error---12345', e);
    return res.status(ERROR_CODES.BAD_REQUEST).json({
      error: true,
      message: e.toString(),
    });
  }
};

module.exports = {
  deleteAdminValidation,
  deleteValidation,
};
