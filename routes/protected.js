const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

// Example protected route
router.get('/protected', jwtAuthMiddleware, (req, res) => {
  // Access the authenticated user through req.user
  const authenticatedUser = req.user;

  // Your logic to retrieve and send the user's profile or other data here
  res.status(200).json(authenticatedUser);
});

module.exports = router;
