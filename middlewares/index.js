const userMiddleware = require('./user.middleware');
const packagesMiddleware = require('./packages.middleware');
const companiesMiddleware = require('./companies.middleware');
const hotelsMiddleware = require('./hotels.middleware');
const bookingMiddleware = require('./booking.middleware');
const attachmentMiddleware = require('./attachment.middleware');
const servicesMiddleware = require('./services.middleware');

module.exports = {
  userMiddleware,
  packagesMiddleware,
  companiesMiddleware,
  hotelsMiddleware,
  bookingMiddleware,
  attachmentMiddleware,
  servicesMiddleware,
};
