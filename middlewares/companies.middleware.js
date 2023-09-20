const validateCompanyData = (req, res, next) => {
  const { name, user_id, phone_number } = req.body;

  if (!name || !user_id || !phone_number) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  next();
};

module.exports = {
  validateCompanyData,
};
