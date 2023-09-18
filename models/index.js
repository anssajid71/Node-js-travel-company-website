const { Sequelize } = require('sequelize');
const UserModel = require('./User.model');
const CompaniesModel = require('./Companies.model');
const PackagesModel = require('./Packages.model');
const ServicesModel = require('./Services.model');
const ReviewsModel = require('./Reviews.model');
const AttachmentsModel = require('./Attachments.model');
const BookingModel = require('./Booking.model');
const HotelsModel = require('./Hotels.model');

const sequelize = new Sequelize(
  'your_database_name',
  'your_username',
  'your_password',
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

// Initialize the Sequelize models with the Sequelize instance
const User = UserModel(sequelize);
const Companies = CompaniesModel(sequelize);
const Packages = PackagesModel(sequelize);
const Services = ServicesModel(sequelize);
const Reviews = ReviewsModel(sequelize);
const Attachments = AttachmentsModel(sequelize);
const Booking = BookingModel(sequelize);
const Hotels = HotelsModel(sequelize);

// Define associations (if you have any) between the models here

// Export the Sequelize instance and models
module.exports = {
  sequelize,
  User,
  Companies,
  Packages,
  Services,
  Reviews,
  Attachments,
  Booking,
  Hotels,
};
