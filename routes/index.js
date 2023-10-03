const express = require('express');
const router = express.Router();

// Import individual route files
const routeModules = [
  'user.route',
  'companies.route',
  'packages.route',
  'services.route',
  'attachments.route',
  'booking.route',
  'hotels.route',
  'auth',
];

// Define your routes dynamically
routeModules.forEach((moduleName) => {
  const route = require(`./${moduleName}`);
  const baseRoute = moduleName.replace('.route', '');
  router.use(`/${baseRoute}`, route);
});

module.exports = router;
