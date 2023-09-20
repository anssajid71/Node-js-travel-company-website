function validateHotelData(req, res, next) {
  const { name, location, id } = req.body;

  if (!name || !location || !images || images.length === 0) {
    return res.status(400).json({ error: 'Please provide valid hotel data.' });
  }

  next();
}

module.exports = {
  validateHotelData,
};
