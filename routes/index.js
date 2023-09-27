const express = require('express');
const router = express.Router();

// Import individual route files
const userRoutes = require('./user.route');
const companiesRoutes = require('./companies.route');
const packagesRoutes = require('./packages.route');
const servicesRoutes = require('./services.route');
const attachmentsRoutes = require('./attachments.route');
const bookingRoutes = require('./booking.route');
const hotelsRoutes = require('./hotels.route');
const authRoutes = require('./auth');

// Define your routes here
router.use('/users', userRoutes);
router.use('/companies', companiesRoutes);
router.use('/packages', packagesRoutes);
router.use('/services', servicesRoutes);
router.use('/attachments', attachmentsRoutes);
router.use('/bookings', bookingRoutes);
router.use('/hotels', hotelsRoutes);
router.use('/auth', authRoutes);

module.exports = router;
