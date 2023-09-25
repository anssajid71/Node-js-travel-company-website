const User = require('../models/User.model');

const {
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors,
} = require('../validations/user.validation');

// Create a new user
exports.createUser = async (req, res) => {
  // Apply validation middleware
  validateUserRegistration.forEach((validation) =>
    validation(req, res, () => {})
  );
  handleValidationErrors(req, res);

  try {
    const { name, email, phone_number, password, retype_password, role } =
      req.body;

    if (!name || !email || !password || !retype_password || !role) {
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
      role,
    });

    // Generate a JWT token
    const token = generateToken(newUser); // You need to implement the generateToken function

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  // Apply validation middleware
  validateUserLogin.forEach((validation) => validation(req, res, () => {}));
  handleValidationErrors(req, res);

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = generateToken(user); // You need to implement the generateToken function

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
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
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
