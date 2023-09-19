const express = require('express');
const router = express.Router();
const HotelsController = require('../controllers/hotels.controller');

router.get('/', HotelsController.getAllHotels);

router.get('/:id', HotelsController.getHotelById);

router.post('/', HotelsController.createHotel);

router.put('/:id', HotelsController.updateHotel);

router.delete('/:id', HotelsController.deleteHotel);

module.exports = router;
