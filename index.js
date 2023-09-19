const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');

// Import your models
const {
  User,
  Companies,
  Packages,
  Services,
  Attachments,
  Booking,
  Hotels,
} = require('./models');

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
(async () => {
  try {
    await sequelize.sync(); // This will create tables if they don't exist
    console.log('Models synced with the database');

    // Your application logic can go here

    // Example: Define a route to retrieve all users
    app.get('/users', async (req, res) => {
      const users = await User.findAll();
      res.json(users);
    });

    // Import middleware (if needed)
    const userMiddleware = require('./middlewares/user.middleware').default;
    const companiesMiddleware =
      require('./middlewares/companies.middleware').default;

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
})();
