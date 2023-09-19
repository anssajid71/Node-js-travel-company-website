const hasCompanyPermissions = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next(); // User has permissions, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: 'Permission denied' }); // User does not have permissions
  }
};

export default {
  hasCompanyPermissions,
};
