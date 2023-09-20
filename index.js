const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const User = require('./models/User.model');
const Companies = require('./models/Companies.model');
const Packages = require('./models/Packages.model');
const Services = require('./models/Services.model');
const Attachments = require('./models/Attachments.model');
const Booking = require('./models/Booking.model');
const Hotels = require('./models/Hotels.model');

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

// Define the User model with ENUM values for "role"

// Load models and establish associations
async () => {
  try {
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

    // Import middleware (if needed)
    const userMiddleware = require('./middlewares/user.middleware').default;
    const companiesMiddleware =
      require('./middlewares/companies.middleware').default;
    const hotelsMiddleware = require('./middlewares/hotels.middleware').default;
    const servicesMiddleware =
      require('./middlewares/services.middleware').default;
    const attachmentMiddleware =
      require('./middlewares/attachment.middleware').default;
    const packagesMiddleware =
      require('./middlewares/packages.middleware').default;
    const bookingMiddleware =
      require('./middlewares/booking.middleware').default;

    // Import routes for each model
    const userRoutes = require('./routes/user.route');
    const companiesRoutes = require('./routes/companies.route');
    const packagesRoutes = require('./routes/packages.route');
    const servicesRoutes = require('./routes/services.route');
    const attachmentsRoutes = require('./routes/attachments.route');
    const bookingRoutes = require('./routes/booking.route');
    const hotelsRoutes = require('./routes/hotels.routes');

    // Use middleware (if needed)
    app.use(userMiddleware);
    app.use(companiesMiddleware);
    app.use(hotelsMiddleware);
    app.use(bookingMiddleware);
    app.use(packagesMiddleware);
    app.use(servicesMiddleware);
    app.use(attachmentMiddleware);

    // Use routes
    app.use('/users', userRoutes);
    app.use('/companies', companiesRoutes);
    app.use('/packages', packagesRoutes);
    app.use('/services', servicesRoutes);
    app.use('/attachments', attachmentsRoutes);
    app.use('/bookings', bookingRoutes);
    app.use('/hotels', hotelsRoutes);

    // Start the Express server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};
