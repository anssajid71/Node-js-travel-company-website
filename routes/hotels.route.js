const express = require('express');
const router = express.Router();
const HotelsController = require('../controllers/hotels.controller');
const hotelsMiddleware = require('../middlewares/hotels.middleware');

router.post(
  '/',
  hotelsMiddleware.validateHotelData,
  HotelsController.createHotel
);
router.put(
  '/:id',
  hotelsMiddleware.validateHotelData,
  HotelsController.updateHotel
);

router.get('/', HotelsController.getAllHotels);
router.get('/:id', HotelsController.getHotelById);
router.post('/', HotelsController.createHotel);
router.put('/:id', HotelsController.updateHotel);
router.delete('/:id', HotelsController.deleteHotel);

module.exports = router;
