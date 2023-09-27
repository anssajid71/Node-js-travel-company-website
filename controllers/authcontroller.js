// controllers/authController.js (example)
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./jwt');

// ...

// Authenticate user (replace with your authentication logic)
const user = await User.findOne({ email });

if (!user || user.password !== password) {
  return res.status(401).json({ error: 'Invalid credentials' });
}

// Generate a JWT token upon successful login
const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

res.status(200).json({ message: 'Login successful', token });
