const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const { message } = await productsService.findAll();
  // if (type) return res.status(404).json({ message: 'Product not found ' });
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
};