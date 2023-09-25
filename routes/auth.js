const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { jwtSecret } = require('../config');
const User = require('../models/User.model'); // Import your User model

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Replace with your actual user authentication logic
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Register route (if needed)
// Add a route to create a new user account with JWT authentication

module.exports = router;
