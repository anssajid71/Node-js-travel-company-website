const dependable = require('dependable');
const path = require('path');

// Create a container
const container = dependable.container();

// Define dependencies
const simpleDependencies = [
  ['_', 'lodash'],
  ['async', 'async'],
  ['jwt', 'jsonwebtoken'],
  ['moment', 'moment'],

  // Required Models
  ['User', './models/user'],
  ['Services', './models/services'],
  ['Packages', './models/packages'],
  ['Hotels', './models/hotels'],
  ['Companies', './models/companies'],
  ['Booking', './models/booking'],
  ['Attachments', './models/attachments'],
];

// Register dependencies
simpleDependencies.forEach(function (dependency) {
  container.register(dependency[0], function () {
    return require(dependency[1]);
  });
});

// Load other modules
container.load(path.join(__dirname, '/utils'));
container.load(path.join(__dirname, '/config'));
container.load(path.join(__dirname, '/migrations'));
container.load(path.join(__dirname, '/routes'));
container.load(path.join(__dirname, '/validations'));
container.load(path.join(__dirname, '/middlewares'));
container.load(path.join(__dirname, '/controllers'));

// Register the container itself
container.register('container', function () {
  return container;
});

// Export the container
module.exports = container;
