const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated
  }
};

export default {
  isAuthenticated,
};
