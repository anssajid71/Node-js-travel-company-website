const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone_number, password, retype_password, role } =
      req.body;

    if (!name | !email || !password || !retype_password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password !== retype_password) {
      return res.status(400).json({ error: 'Retyped password does not match' });
    }

    if (role !== 'admin' && role !== 'user') {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const newUser = await User.create({
      name,
      email,
      phone_number,
      password,
      retype_password,
      role,
    });

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      jwtSecret,
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    // Your user update logic here
    // Example: const updatedUser = await User.update(req.body, { where: { id: req.params.id } });
    // Return a success response
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user profile (requires token verification)
exports.getUserProfile = (req, res) => {
  // Access the authenticated user through req.user
  const authenticatedUser = req.user;

  // Your logic to retrieve and send the user's profile here
  res.status(200).json(authenticatedUser);
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Your logic to retrieve all users here
    // Example: const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    // Your logic to retrieve a user by ID here
    // Example: const user = await User.findByPk(req.params.id);
    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    // Your logic to delete a user by ID here
    // Example: const deletedUser = await User.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
