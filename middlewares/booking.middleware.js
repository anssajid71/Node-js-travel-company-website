function validateBookingData(req, res, next) {
  const {
    user_id,
    package_id,
    date,
    type,
    total_number_of_persons,
    pickup_location,
    total_cost,
    status,
    payment_method,
    payment_status,
  } = req.body;

  if (
    !user_id ||
    !package_id ||
    !date ||
    !type ||
    !total_number_of_persons ||
    !pickup_location ||
    !total_cost ||
    !status ||
    !payment_method ||
    !payment_status
  ) {
    return res
      .status(400)
      .json({ error: 'Please provide valid booking data.' });
  }

  next();
}

module.exports = {
  validateBookingData,
};
