const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');

// Import routes for each model
const userRoutes = require('./routes/user.route');
const companiesRoutes = require('./routes/companies.route');
const packagesRoutes = require('./routes/packages.route');
const servicesRoutes = require('./routes/services.route');
const attachmentsRoutes = require('./routes/attachments.route');
const bookingRoutes = require('./routes/booking.route');
const hotelsRoutes = require('./routes/hotels.routes');

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
    app.get('/users', async (req, res) => {
      const users = await User.findAll();
      res.json(users);
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
    app.use('/users', userMiddleware, userRoutes);
    app.use('/companies', companiesMiddleware, companiesRoutes);
    app.use('/packages', packagesMiddleware, packagesRoutes);
    app.use('/services', servicesMiddleware, servicesRoutes);
    app.use('/attachments', attachmentMiddleware, attachmentsRoutes);
    app.use('/bookings', bookingMiddleware, bookingRoutes);
    app.use('/hotels', hotelsMiddleware, hotelsRoutes);

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
