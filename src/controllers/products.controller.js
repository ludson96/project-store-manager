const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = (req, res) => {
  const { type, message } = productsService.findAll();
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message);
};

module.exports = {
  findAll,
};