const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

const {
  createHotel,
  updateHotel,
  getAllHotels,
  getHotelById,
  deleteHotel,
} = require('../controllers/hotels.controller');
const {
  validateSignUpRequest,
  isRequestValidated,
} = require('../validations/hotels.validation');

router.post(
  '/signup',
  validateSignUpRequest,
  isRequestValidated,
  // jwtAuthMiddleware,
  createHotel
);

router.put(
  '/:id',
  // validateHotelUpdate,
  // handleValidationErrors,
  // jwtAuthMiddleware,
  updateHotel
);

router.get('/getall', jwtAuthMiddleware, getAllHotels);

router.get('/:id', jwtAuthMiddleware, getHotelById);

router.delete('/:id', jwtAuthMiddleware, deleteHotel);

module.exports = router;
