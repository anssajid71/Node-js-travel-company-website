const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

// Use jwtSecret when signing JWT tokens

const crypto = require('crypto');

// Generate a random secret key with 32 bytes (256 bits)
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);

// Import other modules and routes
const userRoutes = require('./routes/user.route');
const companiesRoutes = require('./routes/companies.route');
const packagesRoutes = require('./routes/packages.route');
const servicesRoutes = require('./routes/services.route');
const attachmentsRoutes = require('./routes/attachments.route');
const bookingRoutes = require('./routes/booking.route');
const hotelsRoutes = require('./routes/hotels.route');
const authMiddleware = require('./middlewares/auth');
const userMiddleware = require('./middlewares/user.middleware');
const AttachmentController = require('./controllers/attachments.controller');

// Create an Express application
const app = express();

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('muhammadanassajid', 'newuser', 'password', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

// Authenticate with the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Load models and establish associations
const seq = async () => {
  try {
    console.log('ANS SAJID');
    await sequelize.sync(); // This will create tables if they don't exist
    console.log('Models synced with the database');

    // Your application logic can go here

    // Example: Define a route to retrieve all users
    // Retrieve all users

    app.get('/user', async (req, res) => {
      const user = await user.findAll();
      res.json(user);
    });
    app.get('/user', async (req, res) => {
      const user = await user.findAll();
      res.json(user);
    });

    // Retrieve all companies
    app.get('/companies', async (req, res) => {
      const companies = await Companies.findAll();
      res.json(companies);
    });

    // Retrieve all booking
    app.get('/bookings', async (req, res) => {
      const bookings = await Booking.findAll();
      res.json(bookings);
    });

    // Retrieve all hotels
    app.get('/hotels', async (req, res) => {
      const hotels = await Hotels.findAll();
      res.json(hotels);
    });

    // Retrieve all packages
    app.get('/packages', async (req, res) => {
      const packages = await Packages.findAll();
      res.json(packages);
    });

    // Retrieve all attachments
    app.get('/attachments', async (req, res) => {
      const attachments = await Attachments.findAll();
      res.json(attachments);
    });

    // Retrieve all services
    app.get('/services', async (req, res) => {
      const services = await Services.findAll();
      res.json(services);
    });

    // Use routes
    app.use('/users', userRoutes);
    app.use('/companies', companiesRoutes);
    app.use('/packages', packagesRoutes);
    app.use('/services', servicesRoutes);
    app.use('/attachments', attachmentsRoutes);
    app.use('/bookings', bookingRoutes);
    app.use('/hotels', hotelsRoutes);
    app.use('/middlewares', userRoutes);
    app.use('/controllers', attachmentsRoutes);
    app.use(bodyParser.json());

    // Use the authentication routes
    app.use('/auth', authRoutes);

    // Use the protected routes (requires authentication)
    app.use('/protected', protectedRoutes);

    // Start the Express server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};
seq();
